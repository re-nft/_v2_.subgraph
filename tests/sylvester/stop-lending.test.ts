import { describe, test, afterEach, clearStore, assert } from "matchstick-as/assembly/index";
import { StopLend } from "../../generated/Sylvester/Sylvester";
import { handleLend, handleStopLend } from "../../mappings/core";
import { assertCounterFields, assertLendingFields, assertNftFields, assertUserFields } from "../assert-utils";
import { createNewLendEvent, createNewStopLendEvent } from "../event-utils";
import { BigInt } from "@graphprotocol/graph-ts";
export { handleLend, handleStopLend };

describe("handleLend()", () => {
  afterEach(() => {
    clearStore();
  });

  test("Should handle Stop Lend event", () => {
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

    let newStopLendEvent: StopLend = createNewStopLendEvent(
      lendingId,
      newLendEvent.block.timestamp.plus(BigInt.fromI32(1)).toString()
    );

    handleStopLend(newStopLendEvent);

    assert.notInStore("Lending", lendingId);
    assertCounterFields(1, 0, 1);
    assertUserFields(lenderAddress, 1);
    assertNftFields(lendingId);
  });
});
