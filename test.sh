#!/usr/bin/env bash

cd $(cd $(dirname "$0") && pwd)
./build.sh
npm link
npm link bayou
suman