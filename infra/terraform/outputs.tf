output "s3_bucket_name" {
  description = "Name of the content bucket used by the app."
  value       = aws_s3_bucket.content_store.bucket
}

output "s3_bucket_arn" {
  description = "ARN of the content bucket."
  value       = aws_s3_bucket.content_store.arn
}

output "iam_user_name" {
  description = "IAM user used by the app to read and write S3 objects."
  value       = aws_iam_user.content_user.name
}

output "iam_access_key_id" {
  description = "Access key ID for the content user."
  value       = aws_iam_access_key.content_user.id
  sensitive   = true
}

output "iam_secret_access_key" {
  description = "Secret access key for the content user."
  value       = aws_iam_access_key.content_user.secret
  sensitive   = true
}
