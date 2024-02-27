#!/bin/bash
echo "owner of temp webapp"
ls -l tmp/webappzip.zip

mv /tmp/webappzip.zip ~/

echo "current directory"
ls -l

unzip webappzip.zip -d ~/webapp

cd ~/webapp


ls -al

npm install

cd