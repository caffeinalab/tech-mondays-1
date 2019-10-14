#!/bin/sh
# USAGE: ./cmd/npm <service> <npm-args>
./cmd/compose.sh exec $1 "npm" "${@:2}"
