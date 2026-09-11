provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "content_store" {
  bucket = var.bucket_name

  force_destroy = false

  tags = {
    Name        = var.bucket_name
    Environment = "dev"
    Application = var.app_name
  }
}

resource "aws_s3_bucket_versioning" "content_store" {
  bucket = aws_s3_bucket.content_store.id

  versioning_configuration {
    status = var.enable_versioning ? "Enabled" : "Suspended"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "content_store" {
  bucket = aws_s3_bucket.content_store.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "content_store" {
  bucket = aws_s3_bucket.content_store.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_iam_user" "content_user" {
  name = "${var.app_name}-content-user"
  path = "/"

  tags = {
    Application = var.app_name
  }
}

resource "aws_iam_access_key" "content_user" {
  user = aws_iam_user.content_user.name
}

resource "aws_iam_user_policy" "content_user_policy" {
  name = "${var.app_name}-s3-content-policy"
  user = aws_iam_user.content_user.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "ListBucket"
        Effect = "Allow"
        Action = [
          "s3:ListBucket",
          "s3:GetBucketLocation"
        ]
        Resource = aws_s3_bucket.content_store.arn
      },
      {
        Sid    = "ReadWriteObjects"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.content_store.arn}/*"
      }
    ]
  })
}
