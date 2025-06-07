output "function_name" {
  value       = aws_lambda_function.my_http_lambda.function_name
}

output "invoke_arn" {
  value       = aws_lambda_function.my_http_lambda.invoke_arn
}