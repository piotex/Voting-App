output "api_endpoint" {
  description = "The API endpoint URL for the HTTP API Gateway."
  value       = aws_apigatewayv2_api.http_api_lambda.api_endpoint
}

output "execution_arn" {
  value = aws_apigatewayv2_api.http_api_lambda.execution_arn
}