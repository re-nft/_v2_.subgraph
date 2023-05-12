# ReNFT Subgraph

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

Consider familiarising yourself with [The Graph FAQ](https://thegraph.com/docs/en/developing/developer-faqs/).

If you wish to run the subgraph locally, see [this](https://thegraph.com/docs/en/operating-graph-node/#getting-started-using-docker). You do not need to take any extra steps other than cloning this repository and all of its submoduels to run all the subgraphs within locally. Simply see `package.json` for all the scripts at your disposal to get up and running with local subgraphs. For this reason, this repository adds `graph-node` as a submodule (read [here](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to familiarise yourself with git submodules). Be careful about pointing this submodule to updated commits. Ensure everything works as expected after you do (all tests passing and nodes/subgraphs deploy correctly).

(To start your local `graph-node`, you will need the following installed on your machine: `docker`, `docker-compose` and `jq`.) <- maybe not needed

TODO: a script to start local graph node
