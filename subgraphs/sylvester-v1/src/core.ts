import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  Lend,
  Rent,
  RentClaimed,
  StopLend,
  StopRent,
} from "../generated/Sylvester/Sylvester";
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
  lending.willAutoRenew = lentParams.willAutoRenew;
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
  lending.expired = false;

  counter.save();
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

  counter.save();
  lending.save();
  renting.save();
  renter.save();
}

export function handleStopRent(event: StopRent): void {
  let returnParams = event.params;
  let renting = Renting.load(returnParams.rentingID.toString())!;
  let lending = Lending.load(renting.lending)!;

  if (lending.willAutoRenew) {
    lending.availableAmount = lending.availableAmount.plus(renting.rentAmount);
  }

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
  // ! we have experienced an issue where StopLend gets emitted before RentClaimed
  // this is because of having willAutoRenew disabled when creating the lending.
  // our contract is designed in such a way that if willAutoRenew is false, StopLend
  // gets emitted before RentClaimed. See below transaction for an example:
  // https://polygonscan.com/tx/0x45e862764b958f4e159ba08568d2ceeb00e5531ae4b19133e7dd595015c9fa0d#eventlog
  // the fix to this is to simply not remove lendings ever...
  // instead we have introduced a new flag on Lending entity: `expired`, which we set to true
  // in handleStopLend. To be able to preserve the Lending so that we can load it in this handler
  lending.rentClaimed = true;

  renting.save();
  lending.save();
}

export function handleStopLend(event: StopLend): void {
  let lendingStopParams = event.params;
  let lending = Lending.load(lendingStopParams.lendingID.toString())!;

  // OLD_COMMENT: remove lending only if the amount is equal to the lend amount
  // now, instead of removing, we merely set lending's `expired` to true
  // reason for why we do this, is in the comment in handleRentClaimed
  let shouldRemove =
    BigInt.compare(
      BigInt.fromI32(lendingStopParams.amount),
      lending.lendAmount,
    ) == 0;

  if (shouldRemove) {
    // we used to properly remove the lending, but see the comment in handleRentClaimed
    // store.remove("Lending", lending.id);
    lending.expired = true;
    lending.save();
  } else {
    lending.lendAmount = lending.lendAmount.minus(
      BigInt.fromI32(lendingStopParams.amount),
    );
    lending.save();
  }
}
