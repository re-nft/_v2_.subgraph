import { describe, test, afterEach, clearStore, assert, beforeEach } from "matchstick-as/assembly/index";
import { Lend, Rent } from "../../generated/Sylvester/Sylvester";
import { handleLend, handleRent } from "../../mappings/core";
import { assertCounterFields, assertRentingFields, assertUserFields } from "../assert-utils";
import { createMultipleNewLendEvents, createNewRentEvent } from "../event-utils";
import { BigInt } from "@graphprotocol/graph-ts";

export { handleLend, handleRent };

const LENDING_COUNT = 5;

let lendings: Array<Lend>;
let isERC721 = true;
let lenderAddress = "0x0000000000000000000000000000000000000002";
let nftAddress = "0x0000000000000000000000000000000000000001";
let maxRentDuration = 1;
let dailyRentPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
let lendAmount = 1;
let paymentToken = 1;

function createLendings(numberOfEvents: number): Array<Lend> {
  let newLentEvents: Array<Lend> = createMultipleNewLendEvents(
    numberOfEvents,
    isERC721,
    lenderAddress,
    nftAddress,
    maxRentDuration,
    dailyRentPrice,
    lendAmount,
    paymentToken
  );

  newLentEvents.forEach(event => {
    handleLend(event);
  });

  return newLentEvents;
}

describe("handleRent()", () => {
  beforeEach(() => {
    lendings = new Array<Lend>();
    let lendEvents: Array<Lend> = createLendings(LENDING_COUNT);
    for (let i = 0; i < lendEvents.length; i++) {
      lendings.push(lendEvents[i]);
    }
  });

  afterEach(() => {
    clearStore();
  });

  test("Handle Single Lend", () => {
    let lending = lendings[0];
    let lendingId = lending.params.lendingID.toString();
    let renterAddress = "0x0000000000000000000000000000000000000011";
    let rentedAt = lending.block.timestamp.plus(BigInt.fromI32(1)).toString();
    let rentDuration = 1;
    let rentAmount = 1;
    let rentingId = lendingId;

    let rentEvent: Rent = createNewRentEvent(renterAddress, lendingId, rentingId, rentAmount, rentDuration, rentedAt);

    handleRent(rentEvent);

    assertRentingFields(renterAddress, lendingId, rentingId, rentAmount, rentDuration, rentedAt, 1);
    assertCounterFields(lendings.length, 1, 2);
    assertUserFields(renterAddress, 2);
  });
});
