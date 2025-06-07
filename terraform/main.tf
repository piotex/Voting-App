provider "aws" {
  region = "eu-central-1" 
}

module "lambda" {
    source = "./lambda"
}

module "api-gateway" {
    source = "./api-gateway" 
    lambda_invoke_arn = module.lambda.invoke_arn 
}

resource "aws_lambda_permission" "allow_apigateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${module.api-gateway.execution_arn}/*/*"
}


