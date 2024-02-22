#!/bin/bash

#Install NodeJs
sudo dnf -y module install nodejs:20/common 

sudo mkdir webapp
#Install unzip
sudo yum install -y unzip

#Install PostgreSQL
sudo dnf -y install postgresql-server

#Setup database
sudo postgresql-setup --initdb

#Start PostgreSQL service
sudo systemctl start postgresql

cd /tmp


#Create a PostgreSQL user called 'cent' edit database
sudo -u postgres psql -c "CREATE ROLE cent with LOGIN PASSWORD 'helloworld';"

#Create a PostgreSQL database called 'testdb' owned by 'cent'
sudo -u postgres createdb testdb --owner=cent

echo "Please save and exit Vim to continue with the setup."

sudo sed -i 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf

#restart db
sudo systemctl restart postgresql.service

cd

mkdir -p /tmp/webapp
