#!/bin/bash


mv /tmp/webappzip.zip ~/

sudo unzip -d ~/webapp ~/webappzip.zip

cd ~/webapp


ls -al

npm install

cd