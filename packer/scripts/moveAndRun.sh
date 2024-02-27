#!/bin/bash


mv /tmp/webappzip ~/

sudo unzip -d webappzip webapp

cd ~/webapp


ls -al

npm install

cd