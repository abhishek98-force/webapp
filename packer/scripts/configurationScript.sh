#! /bin/bash
source ${HOME}/.bashrc

cd /home/packer/code/webapp

export DB_USERNAME=cent
export DB_PASSWORD=helloworld
export DB_NAME=testdb
export DB_HOST=127.0.0.1

npm run migrate-and-run