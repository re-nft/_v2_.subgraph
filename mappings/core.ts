import { BigInt, store } from "@graphprotocol/graph-ts";
import { Lend, Rent, StopRent, RentClaimed, StopLend } from "../generated/Sylvester/Sylvester";
import { Lending, Renting, User } from "../generated/schema";
import { fetchCounter } from "./helpers";

export function handleLend(event: Lend): void {
  let lentParams = event.params;
  let counter = fetchCounter();
  let lending = new Lending(lentParams.lendingID.toString());

  lending.nftAddress = lentParams.nftAddress;
  lending.tokenID = lentParams.tokenID;
  lending.lenderAddress = lentParams.lenderAddress;
  lending.maxRentDuration = BigInt.fromI32(lentParams.maxRentDuration);
  lending.dailyRentPrice = lentParams.dailyRentPrice;
  lending.paymentToken = BigInt.fromI32(lentParams.paymentToken);
  lending.rentClaimed = false;
  lending.lendAmount = BigInt.fromI32(lentParams.lendAmount);
  lending.availableAmount = BigInt.fromI32(lentParams.lendAmount);
  lending.is721 = lentParams.is721;
  lending.lentAt = event.block.timestamp;

  let lender = User.load(lentParams.lenderAddress.toHexString());
  if (lender === null) {
    lender = new User(lentParams.lenderAddress.toHexString());
    counter.user = counter.user + 1;
    lender.cursor = counter.user;
  }
  lending.user = lender.id;
  counter.lending = counter.lending + 1;
  lending.cursor = counter.lending;

  lending.save();
  lender.save();
}

export function handleRent(event: Rent): void {
  let rentedParams = event.params;
  let lendingId = rentedParams.lendingID.toString();
  let rentingId = rentedParams.rentingID.toString();
  let lending = Lending.load(lendingId)!;
  let renting = new Renting(rentingId);
  let counter = fetchCounter();

  renting.renterAddress = rentedParams.renterAddress;
  renting.rentDuration = BigInt.fromI32(rentedParams.rentDuration);
  renting.rentedAt = rentedParams.rentedAt;
  renting.expired = false;
  renting.lending = lendingId;
  renting.rentAmount = BigInt.fromI32(rentedParams.rentAmount);
  lending.availableAmount = lending.availableAmount.minus(renting.rentAmount);

  let renter = User.load(rentedParams.renterAddress.toHexString());
  if (renter === null) {
    renter = new User(rentedParams.renterAddress.toHexString());
    counter.user = counter.user + 1;
    renter.cursor = counter.user;
  }
  renting.user = renter.id;
  counter.renting = counter.renting + 1;
  renting.cursor = counter.renting;

  lending.save();
  renting.save();
  renter.save();
}

export function handleStopRent(event: StopRent): void {
  let returnParams = event.params;
  let renting = Renting.load(returnParams.rentingID.toString())!;
  let lending = Lending.load(renting.lending)!;
  lending.availableAmount = lending.availableAmount.plus(renting.rentAmount);
  let renter = User.load(renting.renterAddress.toHexString())!;
  store.remove("Renting", renting.id);

  renter.save();
  lending.save();
}

export function handleRentClaimed(event: RentClaimed): void {
  let claimParams = event.params;
  let renting = Renting.load(claimParams.rentingID.toString())!;
  let lending = Lending.load(renting.lending)!;
  lending.availableAmount = lending.availableAmount.plus(renting.rentAmount);
  renting.expired = true;
  lending.rentClaimed = true;

  renting.save();
  lending.save();
}

export function handleStopLend(event: StopLend): void {
  let lendingStopParams = event.params;
  let lending = Lending.load(lendingStopParams.lendingID.toString())!;

  store.remove("Lending", lending.id);
}
