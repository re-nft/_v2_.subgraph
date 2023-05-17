# reNFT subgraphs

To get started, first, globally install `graph` binary:

`yarn global add @graphprotocol/graph-cli`

depending on whether you are using `yarn`. We suggest you use `yarn` instead of `npm`.

This command will install `graph` binary on your machine. If after the installation you don't have the binary, add it to your path. You can figure out where `yarn` installs global binaries by running:

`yarn global bin`

take this directory and then add to your path:

```export PATH="$PATH:`yarn global bin`"```

This repository is a [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

To install deps, in the root run `yarn install`.

To execute workspace scripts run something like:

`yarn workspace @renft/subgraphs-azrael codegen`

This would execute `codegen` script in `subgraphs/azrael`

## Adding RPC urls

Specify a space-separated list of RPCs to add to the graph node in the .env file.

Each RPC will be tagged with the name of the network, followed by the RPC. Examples of the formatting for RPC urls can be found in `.env.example`. The list of supported networks can be found [here](https://thegraph.com/docs/en/developing/supported-networks/).

## Notes on using Anvil and other local RPCs

This docker compose file uses `host.docker.internal` which allows docker containers to access ports on the host machine. 

When using localhost RPCs, such as Anvil, replace `localhost` with `host.docker.internal` before adding the RPC to the .env file. For example, `https://localhost:8545` should become `http://host.docker.internal:8545`.

More info on this topic can be found [here](https://medium.com/@TimvanBaarsen/how-to-connect-to-the-docker-host-from-inside-a-docker-container-112b4c71bc66).

## Running the graph node

To start the local graph node, you will need `docker`, `docker-compose`, and `jq`. 

Then, run:

`./scripts/run_node.sh`

## Deploying a subgraph

To deploy a subgraph, run:

`./scripts/deploy_subgraphs.sh {list of subgraph names}`

For example, to create a single subgraph, run:

`./scripts/deploy_subgraphs.sh azrael`

To deploy multiple subgraphs at once, run:

`./scripts/deploy_subgraphs.sh azrael sylvester-v0`

To deploy all subgraphs, leave off any parameters to the script:

`./scripts/deploy_subgraphs.sh`

Consider familiarising yourself with [The Graph FAQ](https://thegraph.com/docs/en/developing/developer-faqs/).
