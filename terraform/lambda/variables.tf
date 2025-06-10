variable "lambda_iam_role_arn" {
  type        = string
}

variable "function_name" {
  type        = string
}

variable "handler_name" {
  type        = string
}

variable "source_file_path" {
  type        = string
}

variable "runtime" {
  type        = string
  default     = "python3.13"
}

variable "memory_size" {
  type        = number
  default     = 128
}

variable "timeout" {
  type        = number
  default     = 30
}

variable "environment_variables" {
  type        = map(string)
  default     = {}
}