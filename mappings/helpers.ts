import { BigInt } from "@graphprotocol/graph-ts";
import { User, LendingRentingCount, UserCount } from "../generated/schema";

const fetchUserCount = (): UserCount => {
  let userCount = UserCount.load('usercount');
  if (userCount === null) {
    userCount = new UserCount('usercount');
    userCount.count = 0;
    userCount.save();
  }
  return <UserCount>userCount;
}

export const fetchUser = (address: String): User => {
  let user = User.load(<string>address);
  if (user === null) {
    let userCount = fetchUserCount();
    user = new User(<string>address);
    userCount.count = userCount.count + 1;
    user.cursor = userCount.count;

    userCount.save();
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
