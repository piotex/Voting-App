resource "aws_cloudfront_origin_access_control" "oac" {
  name                          = "${var.s3_bucket_name}-oac"
  description                   = "OAC for static website S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior              = "always"
  signing_protocol              = "sigv4"
}

resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = var.s3_bucket_id
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
        Resource  = "${var.s3_bucket_arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      },
    ]
  })
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  enabled           = true
  is_ipv6_enabled   = false
  comment           = "CloudFront distribution for ${var.s3_bucket_name} static website"
  default_root_object = "index.html"

  origin {
    domain_name              = var.s3_bucket_regional_domain_name
    origin_id                = var.s3_bucket_id
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    target_origin_id       = var.s3_bucket_id
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

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  depends_on = [
    aws_cloudfront_origin_access_control.oac
  ]
}