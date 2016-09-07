#!/usr/bin/env bash

npm run build
sed -i -e "s/\(<\!-- cordova -->\)/<script src=\"cordova.js\"><\/script>/g" public/index.html
cd mobile
cordova run ios
