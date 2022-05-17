#!/bin/sh
npm run build
rm -rf ../phonebook_back/build
cp -r build ../phonebook_back