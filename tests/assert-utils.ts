import { assert } from "matchstick-as";

export const RENTING_ENTITY = "Renting";
export const LENDING_ENTITY = "Lending";
export const COUNTER_ENTITY = "Counter";
export const USER_ENTITY = "User";
export const LENDING_RENTING_COUNTER_ENTITY = "LendingRentingCount";
export const NFT_ENTITY = "Nft";

export function assertCounterFields(
  lendingCount: i32,
  rentingCount: i32,
  userCount: i32
): void {
  assert.fieldEquals(
    COUNTER_ENTITY,
    "counter",
    "lending",
    lendingCount.toString()
  );
  assert.fieldEquals(
    COUNTER_ENTITY,
    "counter",
    "renting",
    rentingCount.toString()
  );
  assert.fieldEquals(COUNTER_ENTITY, "counter", "user", userCount.toString());
}

export function assertUserFields(address: string, cursor: i32): void {
  assert.fieldEquals(USER_ENTITY, address, "id", address);
  assert.fieldEquals(USER_ENTITY, address, "cursor", cursor.toString());
}

export function assertLendingRentingCounterFields(
  lendingCount: i32,
  rentingCount: i32
): void {
  assert.fieldEquals(
    LENDING_RENTING_COUNTER_ENTITY,
    "lendingRentingCount",
    "lending",
    lendingCount.toString()
  );
  assert.fieldEquals(
    LENDING_RENTING_COUNTER_ENTITY,
    "lendingRentingCount",
    "renting",
    rentingCount.toString()
  );
  assert.assertTrue(lendingCount >= rentingCount);
}

// TODO: Nft.id on deployed subgraph does not match the one in unit test. Concerning!
export function assertNftFields(
  nftAddress: string,
  tokenId: i32,
  lentAmount: i32
): void {
  let id = nftAddress
    .concat("::")
    .concat(tokenId.toString())
    .concat("::")
    .concat(lentAmount.toString());
  assert.fieldEquals(NFT_ENTITY, id, "id", id);
}
