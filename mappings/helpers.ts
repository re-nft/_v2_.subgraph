import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { User, LendingRenting } from "../generated/schema";

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
export const fetchLendingRenting = (id: string): LendingRenting => {
  let lendingRenting = LendingRenting.load(id);
  if (lendingRenting === null) {
    lendingRenting = new LendingRenting(id);
    lendingRenting.lending = new Array<string>();
    lendingRenting.renting = new Array<string>();
    lendingRenting.save();
  }
  return <LendingRenting>lendingRenting;
};

export const getNftId = (nftAddr: Bytes, tokenId: BigInt): string =>
  nftAddr.toHexString().concat("::").concat(tokenId.toString());
