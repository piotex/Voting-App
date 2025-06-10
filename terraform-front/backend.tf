terraform {
  backend "s3" {
    bucket         = "terraform-state-kubon-tech" 
    key            = "votting-app/terraform-2.tfstate"     
    region         = "eu-central-1"                                
    encrypt        = true                                          
    # dynamodb_table = "my-terraform-state-lock"                     # DynamoDB table name for state locking
  }
}