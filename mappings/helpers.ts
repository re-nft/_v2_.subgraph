import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Counter, User, LendingRentingCount } from "../generated/schema";

export const fetchUser = (address: Address): User => {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.save();
  }
  return <User>user;
};

export const fetchLrc = (): LendingRentingCount => {
  let lrc = LendingRentingCount.load('lrc');
  if (lrc === null) {
    lrc = new LendingRentingCount('lrc');
    lrc.lending = BigInt.fromI32(0);
    lrc.renting = BigInt.fromI32(0);
    lrc.save();
  }
  return <LendingRentingCount>lrc;
}

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