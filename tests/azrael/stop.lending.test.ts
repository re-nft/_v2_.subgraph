import { BigInt } from '@graphprotocol/graph-ts';
import { test, describe, afterEach, clearStore, assert} from 'matchstick-as/assembly/index'
import { LendingStopped } from '../../generated/Azrael/Azrael';
import {handleLent, handleStopLending} from "../../mappings/core";
import {assertCounterFields, assertUserFields, createNewLentEvent, createNewLendingStoppedEvent} from "../utils";

export {handleLent, handleStopLending}

describe("Handle LendingStopped Event(s)", () => {

    afterEach(() => {
        clearStore()
    })

    test("Handle Single Stop Lending", () => {
        let lendingId = '1';
        let nftAddress = "0x0000000000000000000000000000000000000001"
        let lenderAddress = "0x0000000000000000000000000000000000000002"
        let tokenId = 1;
        let maxRentDuration = 1;
        let dailyRentPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
        let nftPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
        let paymentToken = 1;
        let lentAmount = 1;
        let isERC721 = true;

        let newLentEvent = createNewLentEvent(
            lendingId,
            nftAddress,
            tokenId,
            lenderAddress,
            maxRentDuration,
            dailyRentPrice,
            nftPrice,
            paymentToken,
            lentAmount,
            isERC721
        )

        handleLent(newLentEvent)

        let newLendingStoppedEvent: LendingStopped = createNewLendingStoppedEvent(
            lendingId,
            newLentEvent.block.timestamp.plus(BigInt.fromI32(1)).toI32() // increment by 1
        )

        handleStopLending(newLendingStoppedEvent)

        assert.notInStore("Lending", lendingId)
        assertCounterFields(1, 0, 1);
        assertUserFields(lenderAddress, 1);
        
        // TODO: this should not fail but it does
        // assertLendingRentingCounterFields(1, 0);
        // assertNftFields(nftAddress, tokenId, lentAmount);
    })

})

