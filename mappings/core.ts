import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  Lend,
  Rent,
  StopRent,
  RentClaimed,
  StopLend,
} from "../generated/Registry/Registry";
import { Lending, Renting, User } from "../generated/schema";
import { fetchUser } from "./helpers";

export function handleLend(event: Lend): void {
  let lentParams = event.params;
  let lending = new Lending(lentParams.lendingID.toString());
  lending.nftAddress = lentParams.nftAddress;
  lending.tokenID = lentParams.tokenID;
  lending.lenderAddress = lentParams.lenderAddress;
  lending.maxRentDuration = BigInt.fromI32(lentParams.maxRentDuration);
  lending.dailyRentPrice = lentParams.dailyRentPrice;
  lending.paymentToken = BigInt.fromI32(lentParams.paymentToken);
  lending.rentClaimed = false;
  lending.lendAmount = BigInt.fromI32(lentParams.lendAmount);
  lending.is721 = lentParams.is721;
  let lender = fetchUser(lentParams.lenderAddress);
  lending.userID = lender.id;
  lending.save();
  lender.save();
}

export function handleRent(event: Rent): void {
  let rentedParams = event.params;
  let lendingId = rentedParams.lendingID.toString();
  let renting = new Renting(lendingId);
  renting.renterAddress = rentedParams.renterAddress;
  renting.rentDuration = BigInt.fromI32(rentedParams.rentDuration);
  renting.rentedAt = rentedParams.rentedAt;
  renting.expired = false;
  renting.lendingID = lendingId;
  let renter = fetchUser(rentedParams.renterAddress);
  renting.userID = renter.id;
  renting.save();
  renter.save();
}

export function handleStopRent(event: StopRent): void {
  let returnParams = event.params;
  let renting = Renting.load(returnParams.rentingID.toString());
  let lending = Lending.load(renting.lendingID);
  let renter = User.load(renting.renterAddress.toHexString());
  store.remove("Renting", renting.id);
  renting.save();
  renter.save();
  lending.save();
}

export function handleRentClaimed(event: RentClaimed): void {
  let claimParams = event.params;
  let renting = Renting.load(claimParams.rentingID.toString());
  let lending = Lending.load(renting.lendingID);
  renting.expired = true;
  lending.rentClaimed = true;
  renting.save();
  lending.save();
}

export function handleStopLend(event: StopLend): void {
  let lendingStopParams = event.params;
  let lending = Lending.load(lendingStopParams.lendingID.toString());
  store.remove('Lending', lending.id);
}
