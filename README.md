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

## Versions

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

Another thing to change when deploying to rinkeby is the slug in `package.json`. It should be `renft-registry-rinkeby` or `renft-rinkeby` respectively.

Also, do not forget to change the `network` to `rinkeby` in `subgraph.yaml`.

## Terminology

Azrael - collateral solution

Sylvester - collateral free solution

Whoopi - rev share Wildlife solution

### subgraph.yaml network

If you want to index avalanche, use: `avalanche`.

If you want to index fuji, use: `fuji`.


### Non Ethereum Mainnet Deploys

To deploy to anything other than Ethereum mainnet network you need to:

`graph auth --product hosted-service <ACCESS_TOKEN>`

`graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH NAME>`

So to deploy whoopi-fuji, the slug above would be `re-nft/whoopi-fuji`


### Deployment notes

6/17/2022.

Fuji Deployer: 0xede9a15388ccd972dffbd7c3f5504345703b63b2

Resolver: 0x489C016bB2238Cae7436f16EAD9d0cD5ef9e44AF

ReNFT: 0xBBda1DDeAd65E780b4330F771801011C995fa02E

Noted: there is no TUSD here (payment token 5), TUSD is using USDT (payment token 4) address. There is no WETH here (payment token 1), WETH is using DAI (payment token 2).

Start Block: 10766629
