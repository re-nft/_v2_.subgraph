import { Lend, Rent, StopLend } from "../generated/Sylvester/Sylvester";
import { newMockEvent } from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";

// Lend mock event generators
export function createMultipleNewLendEvents(
  numberOfEvents: number,
  isERC721: boolean,
  lenderAddress: string,
  nftAddress: string,
  maxRentDuration: i32,
  dailyRentPrice: string,
  lendAmount: i32,
  paymentToken: i32
): Array<Lend> {
  let lendEvents = new Array<Lend>();
  for (let i = 0; i < numberOfEvents; i++) {
    let newLendEvent = createNewLendEvent(
      isERC721,
      lenderAddress,
      nftAddress,
      i.toString(),
      i.toString(),
      maxRentDuration,
      dailyRentPrice,
      lendAmount,
      paymentToken
    );
    lendEvents.push(newLendEvent);
  }

  return lendEvents;
}

export function createNewLendEvent(
  isERC721: boolean,
  lenderAddress: string,
  nftAddress: string,
  tokenId: string,
  lendingId: string,
  maxRentDuration: i32,
  dailyRentPrice: string,
  lendAmount: i32,
  paymentToken: i32
): Lend {
  let mockEvent = newMockEvent();
  let newLendEvent = new Lend(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  newLendEvent.parameters = new Array();

  // Creating ethereum values
  let isERC721Value = ethereum.Value.fromBoolean(isERC721);
  let lenderAddressValue = ethereum.Value.fromAddress(Address.fromString(lenderAddress));
  let nftAddressValue = ethereum.Value.fromAddress(Address.fromString(nftAddress));
  let tokenIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(tokenId));
  let lendingIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(lendingId));
  let maxRentDurationValue = ethereum.Value.fromI32(maxRentDuration);
  let dailyRentPriceValue = ethereum.Value.fromBytes(Bytes.fromHexString(dailyRentPrice));
  let lendAmountValue = ethereum.Value.fromI32(lendAmount);
  let paymentTokenValue = ethereum.Value.fromI32(paymentToken);

  // Configure the parameters
  let _isERC721 = new ethereum.EventParam("isERC721", isERC721Value);
  let _lenderAddress = new ethereum.EventParam("lenderAddress", lenderAddressValue);
  let _nftAddress = new ethereum.EventParam("nftAddress", nftAddressValue);
  let _tokenId = new ethereum.EventParam("tokenId", tokenIdValue);
  let _lendingId = new ethereum.EventParam("id", lendingIdValue);
  let _maxRentDuration = new ethereum.EventParam("maxRentDuration", maxRentDurationValue);
  let _dailyRentPrice = new ethereum.EventParam("dailyRentPrice", dailyRentPriceValue);
  let _lendAmount = new ethereum.EventParam("lentAmount", lendAmountValue);
  let _paymentToken = new ethereum.EventParam("paymentToken", paymentTokenValue);
  // Add parameters to the Lend_params array
  newLendEvent.parameters.push(_isERC721);
  newLendEvent.parameters.push(_lenderAddress);
  newLendEvent.parameters.push(_nftAddress);
  newLendEvent.parameters.push(_tokenId);
  newLendEvent.parameters.push(_lendingId);
  newLendEvent.parameters.push(_maxRentDuration);
  newLendEvent.parameters.push(_dailyRentPrice);
  newLendEvent.parameters.push(_lendAmount);
  newLendEvent.parameters.push(_paymentToken);

  return newLendEvent;
}

// Rent mock event generators
export function createNewMultipleRentEvents(
  lendings: Array<Lend>,
  renterAddress: string,
  rentAmount: i32,
  rentDuration: i32,
  rentedAt: BigInt
): Array<Rent> {
  let rentEvents: Array<Rent> = new Array<Rent>();

  for (let i = 0; i < lendings.length; i++) {
    let newRentEvent = createNewRentEvent(
      renterAddress,
      lendings[i].params.lendingID.toString(),
      i.toString(),
      rentAmount,
      rentDuration,
      lendings[i].block.timestamp.plus(BigInt.fromI32(rentedAt)).toString()
    );

    rentEvents.push(newRentEvent);
  }

  return rentEvents;
}

export function createNewRentEvent(
  renterAddress: string,
  lendingId: string,
  rentingId: string,
  rentAmount: i32,
  rentDuration: i32,
  rentedAt: string
): Rent {
  let mockEvent = newMockEvent();

  let newRentEvent = new Rent(
    mockEvent.address,
    mockEvent.transactionLogIndex,
    mockEvent.logIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  newRentEvent.parameters = new Array();

  let renterAddressValue = ethereum.Value.fromAddress(Address.fromString(renterAddress));
  let lendingIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(lendingId));
  let rentingIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(rentingId));
  let rentAmountValue = ethereum.Value.fromI32(rentAmount);
  let rentDurationValue = ethereum.Value.fromI32(rentDuration);
  let rentedAtValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(rentedAt));

  let _renterAddress = new ethereum.EventParam("renterAddress", renterAddressValue);
  let _lendingId = new ethereum.EventParam("lendingId", lendingIdValue);
  let _rentingId = new ethereum.EventParam("rentingId", rentingIdValue);
  let _rentAmount = new ethereum.EventParam("rentAmount", rentAmountValue);
  let _rentDuration = new ethereum.EventParam("rentDuration", rentDurationValue);
  let _rentedAt = new ethereum.EventParam("rentedAt", rentedAtValue);

  newRentEvent.parameters.push(_renterAddress);
  newRentEvent.parameters.push(_lendingId);
  newRentEvent.parameters.push(_rentingId);
  newRentEvent.parameters.push(_rentAmount);
  newRentEvent.parameters.push(_rentDuration);
  newRentEvent.parameters.push(_rentedAt);

  return newRentEvent;
}

export function createNewStopLendEvent(lendingId: string, stoppedAt: string) {
  let mockEvent = newMockEvent();

  let newStopLendEvent = new StopLend(
    mockEvent.address,
    mockEvent.transactionLogIndex,
    mockEvent.logIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  newStopLendEvent.parameters = new Array();

  let lendingIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(lendingId));
  let stoppedAtValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(stoppedAt));

  let _lendingId = new ethereum.EventParam("lendingId", lendingIdValue);
  let _stoppedAt = new ethereum.EventParam("stoppedAt", stoppedAtValue);

  newStopLendEvent.parameters.push(_lendingId);
  newStopLendEvent.parameters.push(_stoppedAt);

  return newStopLendEvent;
}

export function createNewStopRentEvent(rentingId: string, stoppedAt: string) {
  let mockEvent = newMockEvent();

  let newStopRentEvent = new StopLend(
    mockEvent.address,
    mockEvent.transactionLogIndex,
    mockEvent.logIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  newStopRentEvent.parameters = new Array();

  let rentingIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(rentingId));
  let stoppedAtValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(stoppedAt));

  let _rentingId = new ethereum.EventParam("lendingId", rentingIdValue);
  let _stoppedAt = new ethereum.EventParam("stoppedAt", stoppedAtValue);

  newStopRentEvent.parameters.push(_rentingId);
  newStopRentEvent.parameters.push(_stoppedAt);

  return newStopRentEvent;
}
