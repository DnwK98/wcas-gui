#!/bin/sh

echo "REPLACE API URL TO $APP_API_URL"
sed -i -- "s%PROD-API-URL%$APP_API_URL%g" /usr/share/nginx/html/*
