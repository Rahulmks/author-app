variable "aws_region" {
  description = "AWS region where the app resources will be created."
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Globally unique S3 bucket name for the author site content store."
  type        = string
  default     = "author-site-content-rahulmks-2026"
}

variable "app_name" {
  description = "Short application name used in IAM resource names."
  type        = string
  default     = "author-site"
}

variable "enable_versioning" {
  description = "Enable versioning on the S3 bucket."
  type        = bool
  default     = true
}
