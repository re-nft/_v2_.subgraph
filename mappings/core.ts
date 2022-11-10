import { BigInt } from "@graphprotocol/graph-ts";
import { Lend, Rent, StopLend, StopRent } from "../generated/Whoopi/Whoopi";
import { User, Lending, Renting } from "../generated/schema";
import { fetchCounter } from "./helpers";

export function handleLend(event: Lend): void {
  let lentParams = event.params;
  let counter = fetchCounter();
  let lending = new Lending(lentParams.lendingId.toString());

  lending.nftAddress = lentParams.nftAddress.toHexString();
  lending.tokenId = lentParams.tokenId;
  lending.upfrontRentFee = lentParams.upfrontRentFee;
  lending.lenderAddress = lentParams.lenderAddress.toHexString();
  lending.maxRentDuration = BigInt.fromI32(lentParams.maxRentDuration);
  lending.allowedRenters = lentParams.allowedRenters.map<string>(item => item.toHexString());
  lending.paymentToken = BigInt.fromI32(lentParams.paymentToken);
  lending.revShareBeneficiaries = lentParams.revShares.beneficiaries.map<string>(item => item.toHexString());
  lending.revSharePortions = lentParams.revShares.portions;
  lending.lentAt = event.block.timestamp;
  lending.expired = false;
  lending.isAvailable = true;
  // ! do not create a fetchUser and move it into helpers, the
  // counter.user will always be 0
  // let lender = fetchUser(lentParams.lenderAddress.toHexString());
  let lender = User.load(lentParams.lenderAddress.toHexString());
  if (lender === null) {
    lender = new User(lentParams.lenderAddress.toHexString());
    counter.user = counter.user + 1;
    lender.cursor = counter.user;
  }
  lending.user = lender.id;
  counter.lending = counter.lending + 1;
  // using `first` in conjunction with `skip` is one way to
  // paginate. But with the graph you will run into issues
  // when `skip` exceeds 5000. Better way to paginate is using
  // a cursor. See
  // https://thegraph.com/docs/en/querying/graphql-api/#example-using-and-2
  lending.cursor = counter.lending;

  counter.save();
  lending.save();
  lender.save();
}

export function handleRent(event: Rent): void {
  let rentedParams = event.params;
  let lendingId = rentedParams.lendingId.toString();
  // lending will never be null here
  let lending = Lending.load(lendingId)!;
  let rentingId = rentedParams.lendingId
    .toString()
    .concat("::")
    .concat(lending.tokenId.toString())
    .concat("::")
    .concat(event.block.timestamp.toString())
    .concat("::")
    .concat(event.transactionLogIndex.toString());
  let renting = new Renting(rentingId);
  let counter = fetchCounter();

  renting.renterAddress = rentedParams.renterAddress.toHexString();
  renting.rentDuration = BigInt.fromI32(rentedParams.rentDuration);
  renting.rentedAt = event.block.timestamp;
  renting.expired = false;
  renting.lending = lendingId;

  // ! do not create a fetchUser and move it into helpers, the
  // counter.user will always be 0
  // let renter = fetchUser(rentedParams.renterAddress.toHexString());
  let renter = User.load(rentedParams.renterAddress.toHexString());
  if (renter === null) {
    renter = new User(rentedParams.renterAddress.toHexString());
    counter.user = counter.user + 1;
    renter.cursor = counter.user;
  }
  renting.user = renter.id;
  counter.renting = counter.renting + 1;
  lending.lastRenting = renting.id;
  lending.isAvailable = false;
  // using `first` in conjunction with `skip` is one way to
  // paginate. But with the graph you will run into issues
  // when `skip` exceeds 5000. Better way to paginate is using
  // a cursor. See
  // https://thegraph.com/docs/en/querying/graphql-api/#example-using-and-2
  renting.cursor = counter.renting;

  counter.save();
  lending.save();
  renting.save();
  renter.save();
}

export function handleStopLend(event: StopLend): void {
  let lendingStopParams = event.params;
  let lending = Lending.load(lendingStopParams.lendingId.toString())!;

  lending.expired = true;
  lending.isAvailable = false;

  lending.save();
}

export function handleStopRent(event: StopRent): void {
  let stopParams = event.params;
  let lending = Lending.load(stopParams.lendingId.toString())!;
  let renting = Renting.load(lending.lastRenting!)!;

  renting.expired = true;
  lending.isAvailable = true;

  renting.save();
  lending.save();
}
