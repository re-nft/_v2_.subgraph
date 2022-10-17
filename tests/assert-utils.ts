import { assert } from "matchstick-as";
import { Renting } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export const RENTING_ENTITY = "Renting";
export const LENDING_ENTITY = "Lending";
export const COUNTER_ENTITY = "Counter";
export const USER_ENTITY = "User";
export const NFT_ENTITY = "Nft";

export function assertLendingFields(
  is721: boolean,
  lenderAddress: string,
  nftAddress: string,
  tokenID: string,
  lendingID: string,
  maxRentDuration: i32,
  dailyRentPrice: string,
  lendAmount: i32,
  paymentToken: i32,
  cursor: i32,
  lentAt: BigInt,
  hasRenting: boolean = false
): void {
  assert.fieldEquals(LENDING_ENTITY, lendingID, "is721", is721.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingID, "lenderAddress", lenderAddress);
  assert.fieldEquals(LENDING_ENTITY, lendingID, "nftAddress", nftAddress);
  assert.fieldEquals(LENDING_ENTITY, lendingID, "tokenID", tokenID);
  assert.fieldEquals(LENDING_ENTITY, lendingID, "maxRentDuration", maxRentDuration.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingID, "dailyRentPrice", dailyRentPrice);
  assert.fieldEquals(LENDING_ENTITY, lendingID, "lendAmount", lendAmount.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingID, "paymentToken", paymentToken.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingID, "cursor", cursor.toString());
  assert.fieldEquals(LENDING_ENTITY, lendingID, "lentAt", lentAt.toString());
  let rent = Renting.load(lendingID);
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
