#!/usr/bin/env bash
yarn install
if [ $? != 0 ];then
    echo "[Logging] Error: Yarn Installing Error"
    exit 1;
fi
yarn run build
if [ $? != 0 ];then
    echo "[Logging] Error: Nextjs Build Error"
    exit 1;
fi
mkdir -p .next/standalone/.next/static
rm -rf output
mkdir -p output
cp -R .next/static/**  .next/standalone/.next/static
cp -R .next/standalone/* output/
cp -R .next/standalone/.next output/
cp -R bin output/
mv output/server.js output/doris-qrcode-server.js

if [ $? != 0 ];then
    echo "[Logging] Error: Copy Files Error"
    exit 1;
fi
