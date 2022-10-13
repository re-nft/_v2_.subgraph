import { Lend, Rent } from "../generated/Sylvester/Sylvester";
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
  for (let i = 1; i <= numberOfEvents; i++) {
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
  let lenderAddressValue = ethereum.Value.fromAddress(
    Address.fromString(lenderAddress)
  );
  let nftAddressValue = ethereum.Value.fromAddress(
    Address.fromString(nftAddress)
  );
  let tokenIdValue = ethereum.Value.fromUnsignedBigInt(
    BigInt.fromString(tokenId)
  );
  let lendingIdValue = ethereum.Value.fromUnsignedBigInt(
    BigInt.fromString(lendingId)
  );
  let maxRentDurationValue = ethereum.Value.fromI32(maxRentDuration);
  let dailyRentPriceValue = ethereum.Value.fromBytes(
    Bytes.fromHexString(dailyRentPrice)
  );
  let lendAmountValue = ethereum.Value.fromI32(lendAmount);
  let paymentTokenValue = ethereum.Value.fromI32(paymentToken);

  // Configure the parameters
  let _isERC721 = new ethereum.EventParam("isERC721", isERC721Value);
  let _lenderAddress = new ethereum.EventParam(
    "lenderAddress",
    lenderAddressValue
  );
  let _nftAddress = new ethereum.EventParam("nftAddress", nftAddressValue);
  let _tokenId = new ethereum.EventParam("tokenId", tokenIdValue);
  let _lendingId = new ethereum.EventParam("id", lendingIdValue);
  let _maxRentDuration = new ethereum.EventParam(
    "maxRentDuration",
    maxRentDurationValue
  );
  let _dailyRentPrice = new ethereum.EventParam(
    "dailyRentPrice",
    dailyRentPriceValue
  );
  let _lendAmount = new ethereum.EventParam("lentAmount", lendAmountValue);
  let _paymentToken = new ethereum.EventParam(
    "paymentToken",
    paymentTokenValue
  );
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
export function createNewMultipleRentEvents(): Array<Rent> {}

export function createNewRentEvent(): Rent {}
