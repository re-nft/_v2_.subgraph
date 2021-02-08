import { BigInt } from "@graphprotocol/graph-ts";
import {
  Lent,
  Rented,
  Returned,
  CollateralClaimed,
  LendingStopped,
} from "../generated/RentNft/RentNft";
import { Lending, LendingRenting, Renting, User } from "../generated/schema";
import { fetchUser, fetchLendingRenting, getNftId } from "./helpers";

// ! notes for self
// 1. string templating does not work
// 2. variables from function scope not visible inside of .filter
// 3. pushing directly into arrays won't work. Need to make a copy and then assign a copy to prop

export function handleLent(event: Lent): void {
  // ! FACE MUST EXIST AT THIS POINT
  let lentParams = event.params;
  // imagine the following: contract A & contract B
  // contract A is the owner of the NFT
  // they lend it out. They don't see it in their Lend tab
  // contract B borrows. Now they can lend it out
  // they lend it out, and now contrct A can see it and rent it out
  // if contract A defaults, they will pay the collateral
  // this will trigger contract B default, which means contract
  // A can now claim the collateral
  // For this reason the NFT id must have additional information
  // this means that the same actual NFT may have more than one
  // entry in the graph. Number of entries is determined by how
  // many times it was lent out. The so-called NFT "hot-potato"
  // AKA mortgage backed security

  let lending = new Lending(lentParams.lendingId.toString());
  // let lending = new Lending(
  //   event.transaction.hash
  //     .toHexString()
  //     .concat("::")
  //     .concat(lentParams.lendingId.toString())
  // );

  lending.nftAddress = lentParams.nftAddress;
  lending.tokenId = lentParams.tokenId;
  lending.lenderAddress = lentParams.lenderAddress;
  lending.maxRentDuration = BigInt.fromI32(lentParams.maxRentDuration);
  lending.dailyRentPrice = lentParams.dailyRentPrice;
  lending.nftPrice = lentParams.nftPrice;
  lending.paymentToken = BigInt.fromI32(lentParams.paymentToken);
  lending.collateralClaimed = false;

  let lender = fetchUser(lentParams.lenderAddress);
  let newLending = lender.lending;
  newLending.push(lending.id);
  lender.lending = newLending;

  let nftId = getNftId(lending.nftAddress, lending.tokenId);
  let lendingRenting = fetchLendingRenting(nftId);
  let lendings = lendingRenting.lending;
  lendings.push(lending.id);
  lendingRenting.lending = lendings;

  lending.save();
  lender.save();
  lendingRenting.save();
}

export function handleRented(event: Rented): void {
  let rentedParams = event.params;

  let renting = new Renting(event.transaction.hash.toHexString());
  renting.renterAddress = rentedParams.renterAddress;
  renting.rentDuration = BigInt.fromI32(rentedParams.rentDuration);
  renting.rentedAt = rentedParams.rentedAt;
  let lendingId = rentedParams.lendingId.toString();
  renting.lending = lendingId;

  let renter = fetchUser(rentedParams.renterAddress);
  let newRenterRenting = renter.renting;
  newRenterRenting.push(renting.id);
  renter.renting = newRenterRenting;

  let lending = Lending.load(lendingId);
  lending.renting = renting.id;
  let nftId = getNftId(lending.nftAddress, lending.tokenId);
  // we know lendingRenting exists here, no need to fetch
  let lendingRenting = LendingRenting.load(nftId);
  let rentings = lendingRenting.renting;
  rentings.push(renting.id);
  lendingRenting.renting = rentings;

  lending.save();
  renting.save();
  renter.save();
  lendingRenting.save();
}

// on returned, we remove renting from LendingRenting
// we remove from User
// and we null out the renting field in Lending
export function handleReturned(event: Returned): void {
  let returnParams = event.params;
  let lending = Lending.load(returnParams.lendingId.toString());
  let renting = lending.renting;

  let renter = User.load(returnParams.renterAddress.toHexString());
  let rentings = renter.renting;
  let rentingIx = rentings.indexOf(renting);
  rentings.splice(rentingIx, 1);
  renter.renting = rentings;

  let nftId = getNftId(returnParams.nftAddress, returnParams.tokenId);
  let lendingRenting = LendingRenting.load(nftId);
  rentings = lendingRenting.renting;
  rentingIx = rentings.indexOf(renting);
  rentings.splice(rentingIx, 1);
  lendingRenting.renting = rentings;

  lending.renting = null;

  renter.save();
  lending.save();
  lendingRenting.save();
}

// on collateral claim we must remove the lending and renting from LendingRenting
// we must also remove this from the corresponding users' profiles
// renting. todo: in the future mark this in the reputaion of the address
export function handleClaimCollateral(event: CollateralClaimed): void {
  let claimParams = event.params;
  let lending = Lending.load(claimParams.lendingId.toString());

  let nftId = getNftId(claimParams.nftAddress, claimParams.tokenId);
  let lendingRenting = LendingRenting.load(nftId);
  let lendings = lendingRenting.lending;
  let rentings = lendingRenting.renting;
  let lendingIx = lendings.indexOf(lending.id);
  let rentingIx = rentings.indexOf(lending.renting);
  lendings.splice(lendingIx, 1);
  rentings.splice(rentingIx, 1);

  lendingRenting.lending = lendings;
  lendingRenting.renting = rentings;

  lending.collateralClaimed = true;

  lending.save();
  lendingRenting.save();
}

// when someone stops lending, we must remove the entity from the user's
// lending field
// I must also remove the lending - renting pair
export function handleStopLending(event: LendingStopped): void {
  let lendingStopParams = event.params;
  let lending = Lending.load(lendingStopParams.lendingId.toString());

  let nftId = getNftId(lendingStopParams.nftAddress, lendingStopParams.tokenId);
  let lendingRenting = LendingRenting.load(nftId);
  let lendings = lendingRenting.lending;
  let rentings = lendingRenting.renting;
  let lendingIx = lendings.indexOf(lending.id);
  let rentingIx = rentings.indexOf(lending.renting);
  lendings.splice(lendingIx, 1);
  rentings.splice(rentingIx, 1);
  lendingRenting.lending = lendings;
  lendingRenting.renting = rentings;

  let lender = User.load(lending.lenderAddress.toHexString());
  lendings = <string[]>lender.lending;
  lendingIx = lendings.indexOf(lending.id);
  lendings.splice(lendingIx, 1);
  lender.lending = lendings;

  lendingRenting.save();
  lender.save();
  lending.save();
}
