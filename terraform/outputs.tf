output "lambda_function_name" {
  description = "Nazwa funkcji Lambda"
  value       = module.lambda.function_name 
}

output "api_gateway_endpoint" {
  description = "Endpoint HTTP API Gateway"
  value       = module.api-gateway.api_endpoint 
}

output "hello_url" {
  description = "URL do wywołania funkcji Lambda poprzez API Gateway"
  value       = "${module.api-gateway.api_endpoint}/hello" 
}