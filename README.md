# reNFT subgraphs

## Getting Started

First, globally install `graph` binary:

```
yarn global add @graphprotocol/graph-cli
```

> We suggest you use `yarn` instead of `npm`.

This command will install the `graph` binary on your machine. If you still don't have the binary after the installation, you can add it to your path. You can figure out where `yarn` installs global binaries by running:

```
yarn global bin
```

Take this yarn directory and then add to your path:

```
export PATH="$PATH:`yarn global bin`"
```

Consider familiarising yourself with [The Graph FAQ](https://thegraph.com/docs/en/developing/developer-faqs/) as well.

## Installation

This repository is a [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

To install dependencies, run:

```
yarn install
```

To execute scripts specific to a workspace, you can run:

```
yarn workspace @renft/subgraphs-azrael codegen
```

This would execute the `codegen` script in `subgraphs/azrael`

## Adding RPC urls

To use the subgraphs, you must specify a space-separated list of RPCs to add to the graph node in the .env file.

Each RPC will be tagged with the name of the network, followed by the RPC. Examples of the formatting for RPC urls can be found in `.env.example`. The list of supported networks can be found [here](https://thegraph.com/docs/en/developing/supported-networks/).

## Notes on using Anvil and other local RPCs

This docker compose file uses `host.docker.internal` which allows docker containers to access ports on the host machine. 

When using localhost RPCs, such as Anvil, replace `localhost` with `host.docker.internal` before adding the RPC to the .env file. For example, `https://localhost:8545` should become `http://host.docker.internal:8545`.

More info on this topic can be found [here](https://medium.com/@TimvanBaarsen/how-to-connect-to-the-docker-host-from-inside-a-docker-container-112b4c71bc66).

## Running the graph node

To start the local graph node, you will need `docker`, `docker-compose`, and `jq`. Then, run:

```
./scripts/run_node.sh
```

> **_NOTE:_**  The node must be running before deploying local subgraphs.

## Deploying a subgraph

To create a single subgraph, specify the subgraph in the script. Examples:

```
yarn deploy-local:azrael

yarn deploy-local:sylvester-v0
```

To deploy all subgraphs, leave off any parameters to the script:

```
yarn deploy-local
```

## Adding a new subgraph

After adding a new subgraph folder, you will want to add a few scripts to `package.json`.

To connect with the workspace root command to deploy all subgraphs at once, you will need a script called `execute-local-deploy`, which will use `npm-run-all` to call the `codegen`, `create-local`, and `deploy` scripts. Examples of these can be found in other subgraph folders.

Once these scripts are added, complete the script linking process by adding a script in the workspace root `package.json` called `deploy-local:<subgraph_folder_name>`. This script will call the `execute-local-deploy` script that is found in your new subgraph workspace. 

Now all subgraphs can be deployed at once with `yarn deploy-local`.
