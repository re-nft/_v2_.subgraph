import { assert } from "matchstick-as";
import { Renting } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
export const RENTING_ENTITY = "Renting";
export const LENDING_ENTITY = "Lending";
export const COUNTER_ENTITY = "Counter";
export const USER_ENTITY = "User";
export const NFT_ENTITY = "Nft";

export function assertLendingFields(
  isERC721: boolean,
  lenderAddress: string,
  nftAddress: string,
  tokenId: string,
  lendingId: string,
  maxRentDuration: i32,
  dailyRentPrice: string,
  lendAmount: i32,
  paymentToken: i32,
  cursor: i32,
  lentAt: BigInt,
  hasRenting: boolean = false
): void {
  assert.fieldEquals(LENDING_ENTITY, lendingId, "isERC721", isERC721.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingId, "lenderAddress", lenderAddress);
  assert.fieldEquals(LENDING_ENTITY, lendingId, "nftAddress", nftAddress);
  assert.fieldEquals(LENDING_ENTITY, lendingId, "tokenId", tokenId);
  assert.fieldEquals(LENDING_ENTITY, lendingId, "maxRentDuration", maxRentDuration.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingId, "dailyRentPrice", dailyRentPrice);
  assert.fieldEquals(LENDING_ENTITY, lendingId, "lendAmount", lendAmount);
  assert.fieldEquals(LENDING_ENTITY, lendingId, "paymentToken", paymentToken);
  assert.fieldEquals(LENDING_ENTITY, lendingId, "cursor", cursor.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingId, "lentAt", lentAt.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingId, "hasRenting", hasRenting.toString());

  let rent = Renting.load(lendingId);
  if (hasRenting) {
    assert.assertNotNull(rent);
  } else {
    assert.assertNull(rent);
  }
}

export function assertRentingFields(
  renterAddress: string,
  lendingId: string,
  rentingId: string,
  rentAmount: i32,
  rentDuration: i32,
  rentedAt: string,
  cursor: i32
): void {
  assert.fieldEquals(RENTING_ENTITY, rentingId, "renterAddress", renterAddress);
  assert.fieldEquals(RENTING_ENTITY, rentingId, "lendingId", lendingId);
  assert.fieldEquals(RENTING_ENTITY, rentingId, "rentAmount", rentAmount.toString());
  assert.fieldEquals(RENTING_ENTITY, rentingId, "rentDuration", rentDuration.toString());
  assert.fieldEquals(RENTING_ENTITY, rentingId, "rentedAt", rentedAt);
  assert.fieldEquals(RENTING_ENTITY, rentingId, "cursor", cursor.toString(ßßß));
}

export function assertCounterFields(lendingCount: i32, rentingCount: i32, userCount: i32): void {
  assert.fieldEquals(COUNTER_ENTITY, "counter", "lending", lendingCount.toString());
  assert.fieldEquals(COUNTER_ENTITY, "counter", "renting", rentingCount.toString());
  assert.fieldEquals(COUNTER_ENTITY, "counter", "user", userCount.toString());
}

export function assertUserFields(address: string, cursor: i32): void {
  assert.fieldEquals(USER_ENTITY, address, "id", address);
  assert.fieldEquals(USER_ENTITY, address, "cursor", cursor.toString());
}

export function assertNftFields(lendingId: string): void {
  assert.fieldEquals(NFT_ENTITY, lendingId, "id", lendingId);
}
