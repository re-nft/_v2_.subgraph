import { Address } from "@graphprotocol/graph-ts";
import { User } from "../generated/schema";
import { Counter } from "../generated/schema";

export const fetchUser = (address: Address): User => {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.save();
  }
  return <User>user;
};

import { Counter } from "../generated/schema";

export const fetchCounter = (): Counter => {
  let c = Counter.load("counter");
  if (c === null) {
    c = new Counter("counter");
    c.lending = 0;
    c.renting = 0;
    c.user = 0;

    c.save();
  }
  return <Counter>c;
};
