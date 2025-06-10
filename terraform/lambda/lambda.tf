data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = var.source_file_path
  output_path = "${path.module}/../${var.function_name}.zip"
}

resource "aws_lambda_function" "lambda" {
  function_name    = var.function_name
  handler          = var.handler_name
  runtime          = var.runtime
  role             = var.lambda_iam_role_arn
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  memory_size      = var.memory_size
  timeout          = var.timeout

  dynamic "environment" {
    for_each = length(keys(var.environment_variables)) > 0 ? [1] : []
    content {
      variables = var.environment_variables
    }
  }
}

resource "null_resource" "cleanup_lambda_zip" {
  triggers = {
    zip_file_path = data.archive_file.lambda_zip.output_path
  }
  depends_on = [aws_lambda_function.lambda]
  provisioner "local-exec" {
    command = "rm -f ${data.archive_file.lambda_zip.output_path}"
  }
}