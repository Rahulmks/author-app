# AWS infrastructure for the author site

This Terraform configuration creates the minimal AWS resources required for the S3-backed content layer:

- S3 bucket for public content storage
- Bucket versioning and encryption
- IAM user and policy for app access

## Prerequisites

- Terraform installed locally
- AWS CLI configured with credentials for an account where resources will be created

## Usage

1. Change directory:

   ```bash
   cd infra/terraform
   ```

2. Initialize Terraform:

   ```bash
   terraform init
   ```

3. Review the plan:

   ```bash
   terraform plan
   ```

4. Apply the infrastructure:

   ```bash
   terraform apply
   ```

5. Copy the output values into the app environment variables:

   - `AWS_REGION`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `S3_BUCKET_NAME`

## Notes

- This does not deploy the Next.js app itself; it provisions the supporting AWS resources for the content repository.
- The app can remain on Vercel while AWS S3 stores the content JSON and media objects.
- For production, add a separate bucket policy, KMS encryption, and consider a more restrictive IAM setup.
