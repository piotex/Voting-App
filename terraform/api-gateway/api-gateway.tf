variable "lambda_invoke_arn" { 
  type        = string
}


resource "aws_apigatewayv2_api" "http_api_lambda" {
  name          = "MyHttpApiLambdaFromFile"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = aws_apigatewayv2_api.http_api_lambda.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = var.lambda_invoke_arn
}

resource "aws_apigatewayv2_route" "hello_route" {
  api_id    = aws_apigatewayv2_api.http_api_lambda.id
  route_key = "GET /hello" 
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api_lambda.id
  name        = "$default" 
  auto_deploy = true
}