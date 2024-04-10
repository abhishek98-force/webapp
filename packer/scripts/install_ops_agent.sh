#!/bin/bash

#create log director
sudo mkdir -p /var/log/csye6225
sudo chown -R csye6225:csye6225 /var/log/csye6225


# Download and install Ops Agent


curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# Enable Ops Agent service
sudo systemctl enable google-cloud-ops-agent