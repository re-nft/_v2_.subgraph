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

If you wish to run the subgraph locally, see [this](https://thegraph.com/docs/en/operating-graph-node/#getting-started-using-docker). It explains how to get the graph node up and running with docker. For that reason, this repository adds `graph-node` as a submodule (read [here](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to familiarise yourself with git submodules). Be careful about pointing this submodule to updated commits. Ensure everything works as expected after you do (all tests passing and nodes/subgraphs deploy correctly).

---

There are four deployments of v1 renft contracts. These represent collateral (Azrael) and collateral-free (Sylvester) contracts on both the mainnet and rinkeby.

## Deploy

TODO: fix this (we are using workspaces now)

To deploy run

`yarn codegen`

`yarn build`

`yarn deploy`

## Prod Versions

Azrael Mainnet: no version (dub it 1.0.1)

Sylvester Mainnet: 1.0.2

Azrael Rinkeby: 1.0.1

Sylvester Rinkeby: 1.0.2

Sylvester Matic: 1.0.2-matic. Temp query url: https://api.studio.thegraph.com/query/3020/renft-registry/1.0.2-matic

## Rinkeby

No additional branches were made for the Rinkeby testnet. But here you can find the addresses
of Rinkeby Azrael and Sylvester, as well as the starting blocks to be used in `subgraph.yaml`

Azrael Rinkeby: `0x8e03432370a4a82DE1D2e2A64E3Cf8987B7D1215`
Block: `10110354`
Sylvester Rinkeby: `0x34175ef2ed572fb6253d153e3ab4a2f7b1c11677`
Block: `10110403`

