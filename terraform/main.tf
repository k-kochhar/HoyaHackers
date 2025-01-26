terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-2"
}

resource "aws_instance" "hoyaInstance" {
  ami           = "ami-0eb070c40e6a142a3"  
  instance_type = "t2.large"
  key_name      = "hoyakey"
  
  tags = {
    Name = "hoyaInstance"
  }
}

output "instance_id" {
  value = aws_instance.hoyaInstance.id
}