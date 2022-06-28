import { BigInt, store, Bytes, Address, ByteArray } from "@graphprotocol/graph-ts";
import {
  Lend,
  Rent,
  StopLend,
  StopRent
} from "../generated/Whoopi/Whoopi";
import { Lending, Renting } from "../generated/schema";
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
  lending.expired = false;
  let lender = fetchUser(lentParams.lenderAddress.toHexString());
  lending.user = lender.id;
  lrc.lending = lrc.lending.plus(BigInt.fromI32(1));

  lrc.save();
  lending.save();
  lender.save();
}

export function handleRent(event: Rent): void {
  let rentedParams = event.params;
  let lendingId = rentedParams.lendingId.toString();
  // lending will never be null here
  let lending = Lending.load(lendingId)!;
  let rentingId = rentedParams.lendingId.toString()
    .concat("::").concat(lending.tokenId.toString())
    .concat("::").concat(event.block.timestamp.toString())
    .concat("::").concat(event.transactionLogIndex.toString());
  let renting = new Renting(rentingId);
  let lrc = fetchLrc();

  renting.renterAddress = rentedParams.renterAddress.toHexString();
  renting.rentDuration = BigInt.fromI32(rentedParams.rentDuration);
  renting.rentedAt = event.block.timestamp;
  renting.expired = false;
  renting.lending = lendingId;
  let renter = fetchUser(rentedParams.renterAddress.toHexString());
  renting.user = renter.id;
  lrc.renting = lrc.renting.plus(BigInt.fromI32(1));
  lending.lastRenting = renting.id;

  lrc.save();
  lending.save();
  renting.save();
  renter.save();
}

export function handleStopLend(event: StopLend): void {
  let lendingStopParams = event.params;
  let lending = Lending.load(lendingStopParams.lendingId.toString())!;
  let lrc = fetchLrc();

  lending.expired = true;
  lrc.lending = lrc.lending.minus(BigInt.fromI32(1));

  lrc.save();
  lending.save();
  // store.remove("Lending", lending.id);
}

export function handleStopRent(event: StopRent): void {
  let stopParams = event.params;
  let lending = Lending.load(stopParams.lendingId.toString())!;
  let renting = Renting.load(lending.lastRenting!)!;
  let lrc = fetchLrc();
  // let renter = User.load(renting.renterAddress);
  // store.remove("Renting", renting.id);
  renting.expired = true;
  lrc.renting = lrc.renting.minus(BigInt.fromI32(1));
  lrc.save();
  // renter.save();
  lending.save();
}
