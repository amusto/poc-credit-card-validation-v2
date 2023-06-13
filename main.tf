provider "aws" {
  region = "us-east-1"
}

variable "bucket_name" {
  default = "myapp.com-example"
}

resource "aws_s3_bucket" "app_s3_bucket" {
  bucket = var.bucket_name
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "deploy_bucket" {
  bucket = aws_s3_bucket.app_s3_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.app_s3_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:*"
        Resource  = ["${aws_s3_bucket.app_s3_bucket.arn}",
          "${aws_s3_bucket.app_s3_bucket.arn}/*"]
      },
    ]
  })
}

resource "aws_cloudfront_distribution" "website_cdn" {
  enabled = true

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket_website_configuration.deploy_bucket.id}"
    domain_name = aws_s3_bucket.app_s3_bucket.website_endpoint

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    min_ttl                = "0"
    default_ttl            = "300"
    max_ttl                = "1200"
    target_origin_id       = "origin-bucket-${aws_s3_bucket_website_configuration.deploy_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "website_cdn_id" {
  value = aws_cloudfront_distribution.website_cdn.id
}

output "website_endpoint" {
  value = aws_cloudfront_distribution.website_cdn.domain_name
}
