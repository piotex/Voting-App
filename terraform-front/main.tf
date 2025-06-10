provider "aws" {
  region = "eu-central-1"
}




variable "s3_bucket_name" {
  description = "The name for the S3 bucket to host the static website."
  type        = string
  default     = "voting-app-kubon-tech-frontend-prod"
}





resource "aws_s3_bucket" "website_bucket" {
  bucket = var.s3_bucket_name
}

resource "aws_s3_bucket_versioning" "website_bucket_versioning" {
  bucket = aws_s3_bucket.website_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "website_bucket_ownership_controls" {
  bucket = aws_s3_bucket.website_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "website_bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.website_bucket_ownership_controls]
  bucket     = aws_s3_bucket.website_bucket.id
  acl        = "private"
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                          = "${var.s3_bucket_name}-oac"
  description                   = "OAC for static website S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior              = "always"
  signing_protocol              = "sigv4"
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontOACAccess"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      },
    ]
  })

  depends_on = [
    aws_s3_bucket_public_access_block.public_access_block,
    aws_s3_bucket_ownership_controls.website_bucket_ownership_controls,
    aws_s3_bucket_acl.website_bucket_acl
  ]
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled           = true
  is_ipv6_enabled   = false
  comment           = "CloudFront distribution for ${var.s3_bucket_name} static website"
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.website_bucket.id
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket.website_bucket.id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = true
      headers      = ["Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"]
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
    compress    = true
  }

  custom_error_response {
    error_code          = 404
    response_code       = 200
    response_page_path  = "/index.html"
    error_caching_min_ttl = 60
  }
  custom_error_response {
    error_code          = 403
    response_code       = 200
    response_page_path  = "/index.html"
    error_caching_min_ttl = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  depends_on = [
    aws_s3_bucket_public_access_block.public_access_block,
    aws_cloudfront_origin_access_control.oac
  ]
}

output "s3_bucket_name" {
  description = "The name of the S3 bucket."
  value       = aws_s3_bucket.website_bucket.id
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.id
}
