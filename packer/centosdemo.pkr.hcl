packer {
  required_plugins {
    googlecompute = {
      version = "~> v1.0"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

variable "zone" {
  default = "us-central1-a"
}

variable "project_id" {
  default = "dev-img"
}

source "googlecompute" "centos-stream-8" {
  image_name   = "centos-stream-8"
  machine_type = "n1-standard-4"
  source_image = "centos-stream-8-v20230509"
  ssh_username = "packer"
  zone         = var.zone
  project_id   = var.project_id
  account_file = "dev-img-0b1250fc5338.json"
}

build {
  sources = ["source.googlecompute.centos-stream-8"]

  provisioner "shell" {
    script = "./scripts/script.sh"
  }

  provisioner "shell" {
     inline = [ "mkdir -p /tmp/webapp" ]
  }
 
 provisioner "file" {
    sources = ["../config", "../migrations", "../models","../packer","../src","../.env","../.gitignore"
    ,"../package-lock.json","../package.json","../Readme.md","../server.js"]
    destination = "/tmp/webapp/"
  }

  provisioner "shell"{
    script = "./scripts/moveAndRun.sh"
  }

   provisioner "file" {
    source = "./scripts/node-server.service"
    destination = "/tmp/node-server.service"
  }

  provisioner "shell"{
    script = "./scripts/moveArtifacts.sh"
  }

  provisioner "shell" {
    inline = [
      "sudo mv /tmp/node-server.service /etc/systemd/system/node-server.service",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable node-server.service",
    ]
  }


}