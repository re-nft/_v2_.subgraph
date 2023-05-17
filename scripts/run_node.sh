#!/usr/bin/env bash

# fetch the environment variables of the .env file, 
# and automatically export them
set -a && source .env && set +a

# Check if RPC_TEXT is set in the .env file
if [ -z "$RPC_TEXT" ]; then
    echo "RPC_TEXT is not set in .env file."
    exit 1
fi

# Check the docker compose executable to use
if docker compose version >/dev/null 2>&1; then
    DC="docker compose"
else
    DC="$HOME/.docker/cli-plugins/docker-compose"
fi

start_docker() {
    $DC up
}

stop_docker() {
    $DC down
    # exit $!
}

trap stop_docker EXIT

start_docker