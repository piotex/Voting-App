variable "table_name" {
  type = string
}
variable "hash_key" {
  type = string
}

resource "aws_dynamodb_table" "voting_app_idea_list" {
  name         = var.table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = var.hash_key

  attribute {
    name = var.hash_key
    type = "S"
  }

  tags = {
    Name        = var.table_name
    Environment = "Development" 
  }
}