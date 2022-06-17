import { BigInt } from "@graphprotocol/graph-ts";
import { User, LendingRentingCount } from "../generated/schema";

export const fetchUser = (address: String): User => {
  let user = User.load(<string>address);
  if (user === null) {
    user = new User(<string>address);
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
