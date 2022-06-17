import { BigInt, store, Bytes, Address, ByteArray } from "@graphprotocol/graph-ts";
import {
  Lend,
  Rent,
  StopLend,
  StopRent
} from "../generated/Whoopi/Whoopi";
import { Lending, Renting, User } from "../generated/schema";
import { fetchUser, fetchLrc } from "./helpers";

export function handleLend(event: Lend): void {
  let lentParams = event.params;
  let lrc = fetchLrc();
  let lending = new Lending(lentParams.lendingId.toString());

  lending.nftAddress = lentParams.nftAddress.toHexString();
  lending.tokenId = lentParams.tokenId;
  lending.upfrontRentFee = lentParams.upfrontRentFee;
  lending.lenderAddress = lentParams.lenderAddress.toHexString();
  lending.maxRentDuration = BigInt.fromI32(lentParams.maxRentDuration);
  lending.allowedRenters = lentParams.allowedRenters.map<string>(
    (item) => item.toHexString()
  );
  lending.paymentToken = BigInt.fromI32(lentParams.paymentToken);
  lending.revShareBeneficiaries = lentParams.revShares.beneficiaries.map<string>(
    (item) => item.toHexString()
  );
  lending.revSharePortions = lentParams.revShares.portions;
  lending.lentAt = event.block.timestamp;
  let lender = fetchUser(lentParams.lenderAddress.toHexString());
  lending.user = lender.id;
  lrc.lending = lrc.lending.plus(BigInt.fromI32(1));

  lrc.save();
  lending.save();
  lender.save();
}

export function handleRent(event: Rent): void {
  // let rentedParams = event.params;
  // let lendingId = rentedParams.lendingId.toString();
  // let rentingId = rentedParams.lendingId.toString()
  //   .concat("::").concat(event.block.toString())
  //   .concat("::").concat(event.transactionLogIndex.toString());
  // let lending = Lending.load(lendingId);
  // let renting = new Renting(rentingId);
  // let lrc = fetchLrc();

  // renting.renterAddress = rentedParams.renterAddress;
  // renting.rentDuration = BigInt.fromI32(rentedParams.rentDuration);
  // renting.rentedAt = event.block.timestamp;
  // renting.expired = false;
  // renting.lending = lendingId;
  // renting.rentAmount = BigInt.fromI32(rentedParams.rentAmount);
  // lending.availableAmount = lending.availableAmount.minus(renting.rentAmount);
  // let renter = fetchUser(rentedParams.renterAddress.toHexString());
  // renting.user = renter.id;
  // lrc.renting = lrc.renting.plus(BigInt.fromI32(1));

  // lrc.save();
  // lending.save();
  // renting.save();
  // renter.save();
}

export function handleStopLend(event: StopLend): void {
  // let lendingStopParams = event.params;
  // let lending = Lending.load(lendingStopParams.lendingID.toString());
  // let lrc = fetchLrc();
  // lrc.lending = lrc.lending.minus(BigInt.fromI32(1));
  // lrc.save();
  // store.remove("Lending", lending.id);
}

export function handleStopRent(event: StopRent): void {
  // let returnParams = event.params;
  // let renting = Renting.load(returnParams.rentingID.toString());
  // let lending = Lending.load(renting.lending);
  // let lrc = fetchLrc();
  // lending.availableAmount = lending.availableAmount.plus(renting.rentAmount);
  // let renter = User.load(renting.renterAddress.toHexString());
  // store.remove("Renting", renting.id);
  // lrc.renting = lrc.renting.minus(BigInt.fromI32(1));
  // lrc.save();
  // renter.save();
  // lending.save();
}
