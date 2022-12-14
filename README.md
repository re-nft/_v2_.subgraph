# ReNFT Subgraph

There are four deployments of v1 renft contracts. These represent collateral (Azrael) and collateral-free (Sylvester) contracts on both the mainnet and rinkeby.

The branches for the respective subgraphs are:
`azrael`
and
`sylvester`

## Deploy

To deploy run

`yarn codegen`

`yarn build`

`yarn deploy`

## Subraph Versions

Azrael Mainnet: no version (dub it 1.0.1)

Sylvester Mainnet: 1.0.2

Azrael Rinkeby: 1.0.1

Sylvester Rinkeby: 1.0.2

Sylvester Matic: 1.0.2-matic. Temp query url: https://api.studio.thegraph.com/query/3020/renft-registry/1.0.2-matic

## Contract Versions

Sylvester-v1 Polygon Mainnet [etherscan](https://polygonscan.com/address/0x4e52b73aa28b7ff84d88ea3a90c0668f46043450): `0x4e52b73aa28b7ff84d88ea3a90c0668f46043450` 

Block: `36825974`

## Rinkeby

No additional branches were made for the Rinkeby testnet. But here you can find the addresses
of Rinkeby Azrael and Sylvester, as well as the starting blocks to be used in `subgraph.yaml`

Azrael Rinkeby: `0x8e03432370a4a82DE1D2e2A64E3Cf8987B7D1215`

Block: `10110354`

Sylvester Rinkeby: `0x34175ef2ed572fb6253d153e3ab4a2f7b1c11677`

Block: `10110403`

Another thing to change when deploying to rinkeby is the slug in `package.json`. It should be `renft-registry-rinkeby` or `renft-rinkeby` respectively.

Also, do not forget to change the `network` to `rinkeby` in `subgraph.yaml`.

## Terminology

Azrael - collateral solution

Sylvester - collateral free solution
