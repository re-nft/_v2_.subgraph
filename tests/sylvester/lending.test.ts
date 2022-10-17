import { describe, test, afterEach, clearStore } from "matchstick-as/assembly/index";
import { log } from "matchstick-as/assembly/log";
import { handleLend } from "../../mappings/core";
import { assertCounterFields, assertLendingFields, assertNftFields, assertUserFields } from "../assert-utils";
import { createNewLendEvent } from "../event-utils";
export { handleLend };

describe("handleLend()", () => {
  afterEach(() => {
    clearStore();
  });

  test("Should handle a new Lend", () => {
    let isERC721 = true;
    let lenderAddress = "0x0000000000000000000000000000000000000002";
    let nftAddress = "0x0000000000000000000000000000000000000001";
    let tokenId = "1";
    let lendingId = "1";
    let maxRentDuration = 1;
    let dailyRentPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
    let lendAmount = 1;
    let paymentToken = 1;

    let newLendEvent = createNewLendEvent(
      isERC721,
      lenderAddress,
      nftAddress,
      tokenId,
      lendingId,
      maxRentDuration,
      dailyRentPrice,
      lendAmount,
      paymentToken
    );

    handleLend(newLendEvent);

    assertLendingFields(
      isERC721,
      lenderAddress,
      nftAddress,
      tokenId,
      lendingId,
      maxRentDuration,
      dailyRentPrice,
      lendAmount,
      paymentToken,
      1,
      newLendEvent.block.timestamp,
      false
    );

    assertCounterFields(1, 0, 1);
    assertUserFields(lenderAddress, 1);
    assertNftFields(lendingId);
  });

  // test("Should handle multiple Lends from the same user", () => {
  //   assert.assertTrue(true);
  // });

  // test("Should handle multiple Lends from different users", () => {
  //   assert.assertTrue(true);
  // });
});
