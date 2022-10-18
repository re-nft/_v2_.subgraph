import { describe, test, afterEach, clearStore } from "matchstick-as/assembly/index";
import { log } from "matchstick-as/assembly/log";
import { handleLend } from "../../mappings/core";
import { assertCounterFields, assertLendingFields, assertNftFields, assertUserFields } from "../assert-utils";
import { createMultipleNewLendEvents, createNewLendEvent } from "../event-utils";
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

  test("Should handle multiple Lends from the same user", () => {
    let numberOfEvents = 5;
    let isERC721 = true;
    let lenderAddress = "0x0000000000000000000000000000000000000002";
    let nftAddress = "0x0000000000000000000000000000000000000001";
    let maxRentDuration = 1;
    let dailyRentPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
    let lendAmount = 1;
    let paymentToken = 1;

    let newLendEvents = createMultipleNewLendEvents(
      numberOfEvents,
      isERC721,
      lenderAddress,
      nftAddress,
      maxRentDuration,
      dailyRentPrice,
      lendAmount,
      paymentToken
    );

    newLendEvents.forEach(event => {
      handleLend(event);
    });

    for (let i = 1; i <= numberOfEvents; i++) {
      assertLendingFields(
        isERC721,
        lenderAddress,
        nftAddress,
        i.toString(),
        i.toString(),
        maxRentDuration,
        dailyRentPrice,
        lendAmount,
        paymentToken,
        i,
        newLendEvents[i - 1].block.timestamp,
        false
      );

      assertNftFields(i.toString());
    }

    assertCounterFields(numberOfEvents, 0, 1);
    assertUserFields(lenderAddress, 1);
  });

  test("Should handle multiple Lends from different users", () => {
    let numberOfEvents = 2;
    let isERC721 = true;
    let lenderAddress1 = "0x0000000000000000000000000000000000000002";
    let lenderAddress2 = "0x0000000000000000000000000000000000000003";
    let nftAddress = "0x0000000000000000000000000000000000000001";
    let maxRentDuration = 1;
    let dailyRentPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
    let lendAmount = 1;
    let paymentToken = 1;

    let newLendEvent1 = createNewLendEvent(
      isERC721,
      lenderAddress1,
      nftAddress,
      "1",
      "1",
      maxRentDuration,
      dailyRentPrice,
      lendAmount,
      paymentToken
    );

    let newLendEvent2 = createNewLendEvent(
      isERC721,
      lenderAddress2,
      nftAddress,
      "2",
      "2",
      maxRentDuration,
      dailyRentPrice,
      lendAmount,
      paymentToken
    );

    handleLend(newLendEvent1);
    handleLend(newLendEvent2);

    assertLendingFields(
      isERC721,
      lenderAddress1,
      nftAddress,
      "1",
      "1",
      maxRentDuration,
      dailyRentPrice,
      lendAmount,
      paymentToken,
      1,
      newLendEvent1.block.timestamp,
      false
    );
    assertLendingFields(
      isERC721,
      lenderAddress2,
      nftAddress,
      "2",
      "2",
      maxRentDuration,
      dailyRentPrice,
      lendAmount,
      paymentToken,
      2,
      newLendEvent2.block.timestamp,
      false
    );

    assertCounterFields(2, 0, 2);
    assertUserFields(lenderAddress1, 1);
    assertUserFields(lenderAddress2, 2);
    assertNftFields("1");
    assertNftFields("2");
  });
});
