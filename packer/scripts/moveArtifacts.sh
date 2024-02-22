#!/bin/bash

sudo mkdir -p /home/csye6225
sudo groupadd csye6225
sudo useradd -M -N -g csye6225 -s /usr/sbin/nologin csye6225
sudo chown -R csye6225:csye6225 /home/csye6225
sudo mv /home/packer/code/webapp /home/csye6225
sudo chown -R csye6225:csye6225 /home/csye6225/webapp


