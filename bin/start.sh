#!/usr/bin/env bash

PORT=4001 nohup ./node-v18.17.1-linux-x64/bin/node ./doris-qrcode-server.js > output.log 2>&1 &
