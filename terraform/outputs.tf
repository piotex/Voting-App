output "api_gateway_endpoint" {
  description = "Endpoint HTTP API Gateway"
  value       = module.api-gateway.api_endpoint
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution."
  value       = module.cloudfront_cdn.cloudfront_domain_name
}