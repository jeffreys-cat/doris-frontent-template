#!/usr/bin/env bash

pid=$(ps xu | grep "doris-qrcode-server.js" | grep -v grep | awk '{print $2}')
kill -9 $pid
