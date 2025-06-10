variable "dynamodb_target_arns" {
  description = "A list of DynamoDB table ARNs that the Lambda role should have access to."
  type        = list(string)
}

resource "aws_iam_role" "lambda_dynamodb_role" {
  name = "lambda_dynamodb_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  name   = "lambda_dynamodb_policy"
  role   = aws_iam_role.lambda_dynamodb_role.id
  policy = templatefile("${path.module}/files/iam_dynamodb_policy_template.json.tpl", {
    table_arns = var.dynamodb_target_arns
  })
}