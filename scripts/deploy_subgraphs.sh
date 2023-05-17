#!/usr/bin/env bash

# fetch the environment variables of the .env file, 
# and automatically export them
set -a && source .env && set +a

# Check if RPC_TEXT is set in the .env file
if [ -z "$RPC_TEXT" ]; then
    echo "RPC_TEXT is not set in .env file."
    exit 1
fi

# check that the graph node is running
if ! docker top graph-node >/dev/null 2>&1; then
    echo "Graph node is not running. Execute run_node.sh before running this script."
    exit 1
fi

# Wrap all yarn subgraph commands into one
create_and_deploy_subgraph() {
    yarn workspace @renft/subgraphs-$1 codegen
    yarn workspace @renft/subgraphs-$1 create-local
    yarn workspace @renft/subgraphs-$1 deploy-local
}

# Check that the RPC_TEXT env variable contains the specified network for the subgraph
check_rpc_networks_provided() {
    for network in "$@"
    do  
        # Found a network that matches
        if [[ $RPC_TEXT =~ $network ]]; then
            return 0
        fi
    done

    # No valid network found in RPC_TEXT for the subgraph
    echo "No valid network for $subgraph provided in RPC_TEXT."
    exit 1
}

# Check each subgraph for supported name and if the proper RPC url was provided, 
# so we can error early if necessary
for subgraph in "$@"
do
    case $subgraph in 
        azrael|sylvester-v0)
            check_rpc_networks_provided mainnet 
            ;;
        sylvester-v1)
            check_rpc_networks_provided matic
            ;;
        whoopi)
            check_rpc_networks_provided avalanche
            ;;
        *)
            echo "\"$subgraph\" is not a supported subgraph."
            exit 1
            ;;
    esac
done

# if no arguments were passed, then deploy all subgraphs
if [ $# -eq 0 ]; then
    create_and_deploy_subgraph azrael
    create_and_deploy_subgraph sylvester-v0
    create_and_deploy_subgraph sylvester-v1
    create_and_deploy_subgraph whoopi

    exit 0
fi

# Deploy each subgraph specified
for subgraph in "$@"
do  
    create_and_deploy_subgraph $subgraph
done
