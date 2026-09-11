# Deployment Guide

This document covers the prerequisites and first-time deployment steps for the author site.

## Prerequisites

Before deploying, make sure you have the following:

### 1. GitHub repository
- The app is already pushed to GitHub.
- Repository URL:
  - https://github.com/Rahulmks/author-app

### 2. Vercel account
- Create a Vercel account if needed.
- Import the GitHub repository into Vercel.
- Keep these values ready:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`

### 3. AWS account
- Create an AWS account if needed.
- Ensure you can create S3 resources and IAM credentials.
- Keep these values ready:
  - `AWS_REGION`
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `S3_BUCKET_NAME`

### 4. Terraform installed locally
- Install Terraform from HashiCorp.
- Make sure `terraform` is available in your terminal.

### 5. Local app environment
- Install Node dependencies:
  ```bash
  npm install
  ```
- Verify the app builds locally:
  ```bash
  npm run lint
  npm run build
  ```

---

## Infrastructure setup with Terraform

The repository includes Terraform files under `infra/terraform`.

### 1. Go to the Terraform directory
```bash
cd infra/terraform
```

### 2. Initialize Terraform
```bash
terraform init
```

### 3. Apply the infrastructure
Use the bucket name selected for this project:

```bash
terraform apply -var="bucket_name=author-site-content-rahulmks-2026"
```

This creates:
- an S3 bucket
- bucket encryption
- bucket versioning
- bucket access restrictions
- an IAM user with S3 read/write permissions

### 4. Capture Terraform outputs
After apply, note the outputs:
- `s3_bucket_name`
- `iam_access_key_id`
- `iam_secret_access_key`

These will be used as deployment secrets.

---

## GitHub secrets required

Add these repository secrets in GitHub:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `NEXT_PUBLIC_SITE_URL`

`NEXT_PUBLIC_SITE_URL` should be your production site URL after Vercel deployment, for example:

```bash
https://your-project-name.vercel.app
```

---

## Vercel project setup

### 1. Import repository into Vercel
- Open Vercel
- Click New Project
- Import the GitHub repository
- Select the project and continue

### 2. Add environment variables in Vercel
Add the same values used in GitHub secrets:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `NEXT_PUBLIC_SITE_URL`

---

## S3 content setup

The app expects content JSON files in the S3 bucket.

Minimum expected structure:

```text
posts/
  index.json
  published/
    some-post-slug.json
books/
  index.json
videos/
  index.json
podcasts/
  index.json
pages/
  about.json
```

These files should match the data model expected by the repository layer.

---

## First deployment

### 1. Trigger the workflow manually
The deployment workflow is set to manual trigger only.

Go to:
- GitHub repository → Actions → Deploy to Vercel
- Click Run workflow

### 2. Verify deployment
After the workflow finishes:
- check the Vercel deployment output
- open the production URL
- test the public pages:
  - `/`
  - `/posts`
  - `/posts/[slug]`
  - `/books`
  - `/videos`
  - `/podcast`
  - `/about`

---

## Smoke test checklist

Before calling the deployment successful, confirm:

- [ ] Vercel deployment completed
- [ ] AWS S3 bucket exists
- [ ] App loads without 500 errors
- [ ] Post list loads
- [ ] Post detail page loads
- [ ] Books page loads
- [ ] Video page loads
- [ ] Podcast page loads
- [ ] About page loads
- [ ] Images render correctly

---

## Notes

- This project intentionally does not use a traditional database.
- Content is loaded from S3-backed repositories and falls back to mock data locally.
- Authentication and admin CMS are intentionally not part of this phase.
