# ReNFT Subgraph

There are four deployments of v1 renft contracts. These represent collateral (Azrael) and collateral-free (Sylvester) contracts on both the mainnet and rinkeby.

The branches for the respective subgraphs are:
`azrael`
and
`sylvester`

## Rinkeby

No additional branches were made for the Rinkeby testnet. But here you can find the addresses
of Rinkeby Azrael and Sylvester, as well as the starting blocks to be used in `subgraph.yaml`

Azrael Rinkeby: `0x8e03432370a4a82DE1D2e2A64E3Cf8987B7D1215`

Block: `10110354`

Sylvester Rinkeby: `0x34175ef2ed572fb6253d153e3ab4a2f7b1c11677`

Block: `10110403`

Another thing to change when deploying to rinkeby is the slug in `package.json`. It should be `renft-registry-rinkeby` or `renft-rinkeby` respectively.

Also, do not forget to change the `network` to `rinkeby` in `subgraph.yaml`.
