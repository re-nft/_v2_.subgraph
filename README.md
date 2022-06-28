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

6/17/2022.

Fuji Deployer: 0xede9a15388ccd972dffbd7c3f5504345703b63b2

Resolver: 0x489C016bB2238Cae7436f16EAD9d0cD5ef9e44AF

ReNFT: 0xBBda1DDeAd65E780b4330F771801011C995fa02E

Start Block: 10766629

Noted: there is no TUSD here (payment token 5), TUSD is using USDT (payment token 4) address. There is no WETH here (payment token 1), WETH is using DAI (payment token 2).

6/28/2022.

Fuji Deployer: 0x60562aa84697d2829aa14d76b3eba1bc8d4faeb8

Resolver: 0x8217972a12b6e6C4089c4bEaA9dd0CbD3D23D142

ReNFT: 0x5320A33087C1740d4889DbB98ae7d78344285b26

Start Block: 11047937

Notes: there is no TUSD here (payment token 5), TUSD is using USDT (payment token 4) address. There is no WETH here (payment token 1), WETH is using DAI (payment token 2).
