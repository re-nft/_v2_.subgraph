import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { User, Nft } from "../generated/schema";

export const fetchUser = (address: Address): User => {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.lending = new Array<string>();
    user.renting = new Array<string>();
    user.save();
  }
  return <User>user;
};

// id is set to nftAddress::tokenId
export const fetchNft = (id: string): Nft => {
  let nft = Nft.load(id);
  if (nft === null) {
    nft = new Nft(id);
    nft.lending = new Array<string>();
    nft.renting = new Array<string>();
    nft.save();
  }
  return <Nft>nft;
};

export const getNftId = (nftAddr: Bytes, tokenId: BigInt): string =>
  nftAddr.toHexString().concat("::").concat(tokenId.toString());
