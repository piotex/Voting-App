provider "aws" {
  region = "eu-central-1" 
}

# ========== Back End ==========================
module "voting_app_idea_list" {
  source     = "./dynamodb"
  table_name = "voting-app-idea-list"
  hash_key = {
    name = "id"
    type = "N" 
  }
}

module "voting_app_vote_list" {
  source     = "./dynamodb"
  table_name = "voting-app-vote-list"
  hash_key = {
    name = "ip"
    type = "S" 
  }
}

module "lambda_iam_role" {
  source = "./iam"
  dynamodb_target_arns = [
    module.voting_app_idea_list.table_arn,
    module.voting_app_vote_list.table_arn
  ]
}

module "lambda_get_idea_list" {
  source              = "./lambda"
  lambda_iam_role_arn = module.lambda_iam_role.arn
  function_name       = "get_idea_list"
  handler_name        = "get_idea_list.lambda_handler" 
  source_file_path    = "${path.module}/../back-end/lambda/get_idea_list.py" 
}

module "lambda_add_idea" {
  source              = "./lambda"
  lambda_iam_role_arn = module.lambda_iam_role.arn
  function_name       = "add_idea"
  handler_name        = "add_idea.lambda_handler" 
  source_file_path    = "${path.module}/../back-end/lambda/add_idea.py" 
}

module "lambda_set_vote" {
  source              = "./lambda"
  lambda_iam_role_arn = module.lambda_iam_role.arn
  function_name       = "set_vote"
  handler_name        = "set_vote.lambda_handler" 
  source_file_path    = "${path.module}/../back-end/lambda/set_vote.py" 
}

module "api-gateway" {
    source = "./api-gateway" 
    lambdas_map = {
      "${module.lambda_get_idea_list.function_name}" = {
        lambda_name       = module.lambda_get_idea_list.function_name
        lambda_invoke_arn = module.lambda_get_idea_list.invoke_arn 
      },
      "${module.lambda_add_idea.function_name}" = {
        lambda_name       = module.lambda_add_idea.function_name
        lambda_invoke_arn = module.lambda_add_idea.invoke_arn 
      },
      "${module.lambda_set_vote.function_name}" = {
        lambda_name       = module.lambda_set_vote.function_name
        lambda_invoke_arn = module.lambda_set_vote.invoke_arn 
      },
    }
}

# ========== Front End ==========================
variable "s3_bucket_name" {
  type        = string
  default     = "voting-app-kubon-tech"
}

module "s3_website_bucket" {
  source       = "./s3"
  bucket_name  = var.s3_bucket_name
}

module "cloudfront_cdn" {
  source                   = "./cloudfront"
  s3_bucket_name           = var.s3_bucket_name
  s3_bucket_id             = module.s3_website_bucket.bucket_id
  s3_bucket_arn            = module.s3_website_bucket.bucket_arn
  s3_bucket_regional_domain_name = module.s3_website_bucket.bucket_regional_domain_name
}



