#!/bin/bash


echo "Installing all dependency for backend"
npm install
echo "Building latest backend"
npm run build
echo "Building front end"
cd ./client-simple
npm install
npm run build
cd ..
echo "Done. Now running server"
sudo npm run start