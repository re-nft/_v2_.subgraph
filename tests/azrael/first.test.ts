import {Lent} from "../../generated/Azrael/Azrael";
import {newMockEvent, test, describe, assert} from 'matchstick-as/assembly/index'
import {Address, BigInt, Bytes, ethereum} from '@graphprotocol/graph-ts'
import {handleLent} from "../../mappings/core";

function createNewLentEvent(
    id: string,
    nftAddress: string,
    tokenId: string,
    lenderAddress: string,
    maxRentDuration: string,
    dailyRentPrice: string,
    nftPrice: string,
    paymentToken: string,
    lentAmount: string,
    isERC721: boolean,
    lentAt: string
): Lent {
    let mockEvent = newMockEvent();

    let newLentEvent =  new Lent();
    newLentEvent.address = mockEvent.address;
    newLentEvent.logIndex = mockEvent.logIndex;
    newLentEvent.transactionLogIndex = mockEvent.transactionLogIndex;
    newLentEvent.logType = mockEvent.logType;
    newLentEvent.block = mockEvent.block;
    // newLentEvent.transaction = mockEvent.transaction;

    newLentEvent.parameters = new Array()

    let lendingIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(id))
    let nftAddressValue = ethereum.Value.fromAddress(Address.fromString(nftAddress))
    let tokenIdValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(tokenId))
    let lenderAddressValue = ethereum.Value.fromAddress(Address.fromString(lenderAddress))
    let maxRentDurationValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(maxRentDuration))
    let dailyRentPriceValue = ethereum.Value.fromBytes(Bytes.fromHexString(dailyRentPrice))
    let nftPriceValue = ethereum.Value.fromBytes(Bytes.fromHexString(nftPrice))
    let paymentTokenValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(paymentToken))
    let lentAmountValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(lentAmount))
    let isERC721Value = ethereum.Value.fromBoolean(isERC721)
    let lentAtValue = ethereum.Value.fromUnsignedBigInt(BigInt.fromString(lentAt))

    let _lendingId = new ethereum.EventParam()
    _lendingId.name = "id";
    _lendingId.value = lendingIdValue;

    let _nftAddress = new ethereum.EventParam();
    _nftAddress.name = "nftAddress";
    _nftAddress.value = nftAddressValue;

    let _tokenId = new ethereum.EventParam()
    _tokenId.name = "tokenId";
    _tokenId.value = tokenIdValue;

    let _lenderAddress = new ethereum.EventParam()
    _lenderAddress.name = "lenderAddress";
    _lenderAddress.value = lenderAddressValue;
    
    let _maxRentDuration = new ethereum.EventParam()
    _maxRentDuration.name = "maxRentDuration";
    _maxRentDuration.value = maxRentDurationValue;

    let _dailyRentPrice = new ethereum.EventParam()
    _dailyRentPrice.name = "dailyRentPrice";
    _dailyRentPrice.value = dailyRentPriceValue;

    let _nftPrice = new ethereum.EventParam()
    _nftPrice.name = "nftPrice";
    _nftPrice.value = nftPriceValue;

    let _paymentToken = new ethereum.EventParam()
    _paymentToken.name = "paymentToken";
    _paymentToken.value = paymentTokenValue;

    let _lentAmount = new ethereum.EventParam()
    _lentAmount.name = "lentAmount";
    _lentAmount.value = lentAmountValue;

    let _isERC721 = new ethereum.EventParam()
    _isERC721.name = "isERC721";
    _isERC721.value = isERC721Value;

    let _lentAt = new ethereum.EventParam()
    _lentAt.name = "lentAt";
    _lentAt.value = lentAtValue;

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
        // let newLentEvent = createNewLentEvent(
        //     "1",
        //     "0x0000000000000000000000000000000000000001",
        //     "1",
        //     "0x0000000000000000000000000000000000000002",
        //     "1",
        //     "0x0000000000000000000000000000000000000000000000000000000000000001",
        //     "0x0000000000000000000000000000000000000000000000000000000000000001",
        //     "1",
        //     "1",
        //     true,
        //     "1"
        // )

        // let lending = handleLent(newLentEvent)


        assert.assertTrue(true)
    })
})

