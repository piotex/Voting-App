variable "table_name" {
  type = string
}

variable "hash_key" {
  type = object({
    name = string
    type = string
  })
}

resource "aws_dynamodb_table" "dynamodb_table" {
  name         = var.table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = var.hash_key.name

  attribute {
    name = var.hash_key.name
    type = var.hash_key.type
  }

  tags = {
    Name        = var.table_name
    Environment = "Development" 
  }
}

output "table_arn" {
  description = "The ARN of the DynamoDB table."
  value       = aws_dynamodb_table.dynamodb_table.arn
}