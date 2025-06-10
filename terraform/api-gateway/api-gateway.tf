variable "lambdas_map" {
  type = map(object({
    lambda_name       = string
    lambda_invoke_arn = string
  }))
  default = {}
}

resource "aws_apigatewayv2_api" "http_api_lambda" {
  name          = "voting-app-api-tf"
  protocol_type = "HTTP"

  cors_configuration {
    allow_headers     = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods     = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_origins     = ["*"]
    # allow_credentials = true
    max_age           = 300
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  for_each           = var.lambdas_map
  api_id             = aws_apigatewayv2_api.http_api_lambda.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = each.value.lambda_invoke_arn
  payload_format_version = "2.0" 
}

resource "aws_apigatewayv2_route" "lambda_route" {
  for_each  = var.lambdas_map
  api_id    = aws_apigatewayv2_api.http_api_lambda.id
  route_key = "ANY /${each.value.lambda_name}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration[each.key].id}"
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api_lambda.id
  name        = "api"
  auto_deploy = true
}

resource "aws_lambda_permission" "allow_apigateway" {
  for_each      = var.lambdas_map
  statement_id  = "AllowExecutionFromAPIGateway-${each.value.lambda_name}"
  action        = "lambda:InvokeFunction"
  function_name = each.value.lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api_lambda.execution_arn}/*/*"
}