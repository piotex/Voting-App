provider "aws" {
  region = "eu-central-1" 
}

module "voting-app-idea-list" {
  source = "./dynamodb"
  table_name = "voting-app-idea-list"
  hash_key = "name"
}

module "voting-app-vote-list" {
  source = "./dynamodb"
  table_name = "voting-app-vote-list"
  hash_key = "ip"
}

module "lambda_iam_role" {
  source = "./iam"
}

module "lambda_get_idea_list" {
  source = "./lambda"
  lambda_iam_role_arn = module.lambda_iam_role.arn
  function_name       = "get_idea_list_tf"
  handler_name        = "get_idea_list.lambda.lambda_handler" 
  source_file_path    = "${path.module}/../back-end/lambda/get_idea_list.lambda.py" 
}



# module "set_vote" {
#     source = "./lambda"
#     lambda_iam_role_arn = lambda_iam_role.arn
# }

# module "get_idea_list" {
#     source = "./lambda"
#     lambda_iam_role_arn = lambda_iam_role.arn
# }

module "api-gateway" {
    source = "./api-gateway" 
    lambdas_map = {
      "${module.lambda_get_idea_list.function_name}" = {
        lambda_name       = module.lambda_get_idea_list.function_name
        lambda_invoke_arn = module.lambda_get_idea_list.invoke_arn 
      },
    }

    # lambda_invoke_arn = module.lambda_get_idea_list.invoke_arn 
    # lambda_function_name = module.lambda_get_idea_list.function_name
}


# T-O-D-O 
# - one api gateway with multiple stages - represent lambda andpionts

