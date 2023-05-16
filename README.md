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

To start the local graph node, you will need `docker`, `docker-compose`, and `jq`. Then, run:

`docker compose up`

To deploy a subgraph, run:

yarn workspace @renft/subgraphs-azrael codegen

`yarn workspace @renft/subgraphs-azrael create-local`

`yarn workspace @renft/subgraphs-azrael deploy-local`

This would create and deploy a subgraph for azrael.

Consider familiarising yourself with [The Graph FAQ](https://thegraph.com/docs/en/developing/developer-faqs/).
