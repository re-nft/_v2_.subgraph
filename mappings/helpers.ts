import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { User, Nft, Counter } from "../generated/schema";

export const fetchUser = (address: Address): User => {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.save();
  }
  return <User>user;
};

// id is set to nftAddress::tokenId
export const fetchNft = (id: string): Nft => {
  let nft = Nft.load(id);
  if (nft === null) {
    nft = new Nft(id);
    nft.save();
  }
  return <Nft>nft;
};

export const getNftId = (lendingId: BigInt): string =>
  lendingId.toString();


export const fetchCounter = (): Counter => {
  let c = Counter.load('counter');
  if (c === null) {
    c = new Counter('counter');
    c.lending = 0;
    c.renting = 0;
    c.user = 0;

    c.save();
  }
  return <Counter>c;
}