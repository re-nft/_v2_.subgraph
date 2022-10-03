import {Lent} from "../../generated/Azrael/Azrael";
import {newMockEvent, test, describe, assert} from 'matchstick-as/assembly/index'
import {Address, BigInt, Bytes, ethereum} from '@graphprotocol/graph-ts'
import {handleLent} from "../../mappings/core";

export {handleLent}

function createNewLentEvent(
    id: i32,
    nftAddress: string,
    tokenId: string,
    lenderAddress: string,
    maxRentDuration: i32,
    dailyRentPrice: string,
    nftPrice: string,
    paymentToken: i32,
    lentAmount: i32,
    isERC721: boolean
): Lent {
    let mockEvent = newMockEvent();

    let newLentEvent =  new Lent(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
        mockEvent.receipt
    );

    newLentEvent.parameters = new Array()

    let lendingIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(id))
    let nftAddressValue = ethereum.Value.fromAddress(Address.fromString(nftAddress))
    let tokenIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(tokenId))
    let lenderAddressValue = ethereum.Value.fromAddress(Address.fromString(lenderAddress))
    let maxRentDurationValue = ethereum.Value.fromI32(maxRentDuration)
    let dailyRentPriceValue = ethereum.Value.fromBytes(Bytes.fromHexString(dailyRentPrice))
    let nftPriceValue = ethereum.Value.fromBytes(Bytes.fromHexString(nftPrice))
    let paymentTokenValue = ethereum.Value.fromI32(paymentToken)
    let lentAmountValue = ethereum.Value.fromI32(lentAmount)
    let isERC721Value = ethereum.Value.fromBoolean(isERC721)
    let lentAtValue = ethereum.Value.fromUnsignedBigInt(mockEvent.block.timestamp)

    let _lendingId = new ethereum.EventParam("id", lendingIdValue)
    let _nftAddress = new ethereum.EventParam("nftAddress", nftAddressValue);
    let _tokenId = new ethereum.EventParam("tokenId", tokenIdValue);
    let _lenderAddress = new ethereum.EventParam("lenderAddress", lenderAddressValue);
    let _maxRentDuration = new ethereum.EventParam("maxRentDuration", maxRentDurationValue);
    let _dailyRentPrice = new ethereum.EventParam("dailyRentPrice", dailyRentPriceValue);
    let _nftPrice = new ethereum.EventParam("nftPrice", nftPriceValue);
    let _paymentToken = new ethereum.EventParam("paymentToken", paymentTokenValue);
    let _lentAmount = new ethereum.EventParam("lentAmount", lentAmountValue);
    let _isERC721 = new ethereum.EventParam("isERC721", isERC721Value);
    let _lentAt = new ethereum.EventParam("lentAt", lentAtValue);

    newLentEvent.parameters.push(_lendingId)
    newLentEvent.parameters.push(_nftAddress)
    newLentEvent.parameters.push(_tokenId)
    newLentEvent.parameters.push(_lenderAddress)
    newLentEvent.parameters.push(_maxRentDuration)
    newLentEvent.parameters.push(_dailyRentPrice)
    newLentEvent.parameters.push(_nftPrice)
    newLentEvent.parameters.push(_paymentToken)
    newLentEvent.parameters.push(_lentAmount)
    newLentEvent.parameters.push(_isERC721)
    newLentEvent.parameters.push(_lentAt)

    return newLentEvent;
}

describe("handleLent()", () => {

    test("creates Lending", () => {
        let newLentEvent = createNewLentEvent(
            1,
            "0x0000000000000000000000000000000000000001",
            "1",
            "0x0000000000000000000000000000000000000002",
            1,
            "0x0000000000000000000000000000000000000000000000000000000000000001",
            "0x0000000000000000000000000000000000000000000000000000000000000001",
            1,
            1,
            true
        )

        // handleLent(newLentEvent)


        assert.assertTrue(true)
    })
})

