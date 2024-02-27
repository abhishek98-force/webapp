#!/bin/bash


mv /tmp/webappzip.zip ~/

unzip -d ~/webapp ~/webappzip.zip

sudo chown -R packer:packer ~/webapp

cd ~/webapp


ls -al

npm install

cd