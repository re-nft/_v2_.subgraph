# ReNFT Subgraph

There are four deployments of v1 renft contracts. These represent collateral (Azrael) and collateral-free (Sylvester) contracts on both the mainnet and rinkeby.

The branches for the respective subgraphs are:
`azrael`
and
`sylvester`

## Deploy

To deploy (to Ethereum) run

`yarn codegen`

`yarn build`

`yarn deploy`

To non-Ethereum networks (hosted service)

To deploy to anything other than Ethereum mainnet network you need to:

`yarn codegen && yarn build`

`graph auth --product hosted-service <ACCESS_TOKEN>`

`graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>`

So to deploy whoopi-fuji, the slug above would be `re-nft/whoopi-fuji`

## Versions

Azrael Mainnet: no version (dub it 1.0.1)

Sylvester Mainnet: 1.0.2

Sylvester Matic: 1.0.2-matic. Temp query url: https://api.studio.thegraph.com/query/3020/renft-registry/1.0.2-matic

## Terminology

Azrael - collateral solution

Sylvester - collateral free solution

Whoopi - rev share Wildlife solution

### subgraph.yaml network

If you want to index avalanche, use: `avalanche`.

If you want to index fuji, use: `fuji`.

### Deployment notes

Whoopi Fuji: 6/30/2022.

Fuji Deployer: 0xa53576706a6054ade219a0f1966f50ec9a16b8c6

Resolver: 0xD41e46d44f55bC93C33D8cDd7E2CB5BE3e93A4c0

ReNFT: 0x516775e81b0d1fC91Ec326DEd21c33728895Fc6C

Start Block: 11095335
