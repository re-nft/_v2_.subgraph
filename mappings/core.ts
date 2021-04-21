import { BigInt } from "@graphprotocol/graph-ts";
import {
  Lent,
  Rented,
  Returned,
  CollateralClaimed,
  LendingStopped,
} from "../generated/ReNFT/ReNFT";
import { Lending, Renting, Nft, User } from "../generated/schema";
import { fetchUser, fetchNft, getNftId } from "./helpers";

// ! notes for self
// 1. string templating does not work
// 2. variables from function scope not visible inside of .filter
// 3. pushing directly into arrays won't work. Need to make a copy and then assign a copy to prop

export function handleLent(event: Lent): void {
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
  let nft = fetchNft(nftId);
  let lendings = nft.lending;
  lendings.push(lending.id);
  nft.lending = lendings;

  lending.save();
  lender.save();
  nft.save();
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
  // we know nft exists here, no need to fetch
  let nft = Nft.load(nftId);
  let rentings = nft.renting;
  rentings.push(renting.id);
  nft.renting = rentings;

  lending.save();
  renting.save();
  renter.save();
  nft.save();
}

// on returned, we remove renting from Nft
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
  let nft = Nft.load(nftId);
  rentings = nft.renting;
  rentingIx = rentings.indexOf(renting);
  rentings.splice(rentingIx, 1);
  nft.renting = rentings;

  lending.renting = null;

  renter.save();
  lending.save();
  nft.save();
}

// on collateral claim we must remove the lending and renting from LendingRenting
// we must also remove this from the corresponding users' profiles
// renting. todo: in the future mark this in the reputaion of the address
export function handleClaimCollateral(event: CollateralClaimed): void {
  let claimParams = event.params;
  let lending = Lending.load(claimParams.lendingId.toString());

  let nftId = getNftId(claimParams.nftAddress, claimParams.tokenId);
  let nft = Nft.load(nftId);
  let lendings = nft.lending;
  let rentings = nft.renting;
  let lendingIx = lendings.indexOf(lending.id);
  let rentingIx = rentings.indexOf(lending.renting);
  lendings.splice(lendingIx, 1);
  rentings.splice(rentingIx, 1);

  nft.lending = lendings;
  nft.renting = rentings;

  lending.collateralClaimed = true;

  lending.save();
  nft.save();
}

// when someone stops lending, we must remove the entity from the user's
// lending field
// I must also remove the lending - renting pair
export function handleStopLending(event: LendingStopped): void {
  let lendingStopParams = event.params;
  let lending = Lending.load(lendingStopParams.lendingId.toString());

  let nftId = getNftId(lendingStopParams.nftAddress, lendingStopParams.tokenId);
  let nft = Nft.load(nftId);
  let lendings = nft.lending;
  let rentings = nft.renting;
  let lendingIx = lendings.indexOf(lending.id);
  let rentingIx = rentings.indexOf(lending.renting);
  lendings.splice(lendingIx, 1);
  rentings.splice(rentingIx, 1);
  nft.lending = lendings;
  nft.renting = rentings;

  let lender = User.load(lending.lenderAddress.toHexString());
  lendings = <string[]>lender.lending;
  lendingIx = lendings.indexOf(lending.id);
  lendings.splice(lendingIx, 1);
  lender.lending = lendings;

  nft.save();
  lender.save();
  lending.save();
}
