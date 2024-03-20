#!/bin/bash

sudo groupadd csye6225
sudo useradd -M -N -g csye6225 -s /usr/sbin/nologin csye6225
sudo mkdir -p /home/csye6225

sudo mv /home/packer/webapp /home/csye6225

sudo mkdir -p /etc/csye6225

sudo mv /tmp/node-server.service /etc/systemd/system/node-server.service




