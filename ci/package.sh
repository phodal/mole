#!/usr/bin/env bash

npm run build
cd mobile
cordova build android
