packer {
  required_plugins {
    googlecompute = {
      version = "~> v1.0"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

variable "zone" {
  type    = string
  default = "us-central1-a"
}

variable "project_id" {
  type    = string
  default = "dev-img"
}

variable "ssh_username" {
  type    = string
  default = "packer"
}

variable "credential_file_path" {
  type    = string
  default = "./dev-img-0b1250fc5338.json"
}

source "googlecompute" "centos-stream-8" {
  image_name       = "centos-stream-8"
  machine_type     = "n2-standard-4"
  source_image     = "centos-stream-8-v20230509"
  ssh_username     = var.ssh_username
  zone             = var.zone
  project_id       = var.project_id
  credentials_file = var.credential_file_path
}

build {
  sources = ["source.googlecompute.centos-stream-8"]

  provisioner "shell" {
    script = "./scripts/script.sh"
  }

  provisioner "file" {
    source      = "../webappzip.zip"
    destination = "/tmp/webappzip.zip"
  }

  provisioner "shell" {
    script = "./scripts/moveAndRun.sh"
  }

  provisioner "file" {
    source      = "./scripts/node-server.service"
    destination = "/tmp/node-server.service"
  }

  provisioner "shell" {
    script = "./scripts/moveArtifacts.sh"
  }

  provisioner "shell" {
    script = "./scripts/install_ops_agent.sh"
  }

  provisioner "file" {
    source      = "./scripts/config.yaml"
    destination = "/tmp/config.yaml"
  }
  provisioner "shell" {
    inline = [
      "sudo mv /tmp/config.yaml /etc/google-cloud-ops-agent",
      "sudo systemctl restart google-cloud-ops-agent",
      "sudo systemctl restart node-server"
    ]
  }




}