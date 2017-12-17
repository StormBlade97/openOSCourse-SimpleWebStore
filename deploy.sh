#!/bin/bash


echo "Installing all dependency for backend"
npm install
echo "Building latest backend"
npm run build
echo "Done. Now running server"
npm run start