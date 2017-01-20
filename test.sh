#!/usr/bin/env bash

cd $(cd $(dirname "$0") && pwd)
npm link
npm link bayou
suman