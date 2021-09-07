import { Address } from "@graphprotocol/graph-ts";
import { User } from "../generated/schema";

export const fetchUser = (address: Address): User => {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.save();
  }
  return <User>user;
};
