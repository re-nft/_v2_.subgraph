import { store } from '@graphprotocol/graph-ts';
import { test, describe, afterEach, clearStore, logStore, beforeEach} from 'matchstick-as/assembly/index'
import {handleLent} from "../../mappings/core";
import {assertCounterFields, assertLendingFields, assertUserFields, createNewLentEvent, assertLendingRentingCounterFields, createMultipleNewLentEvents} from "../utils";

export {handleLent}

describe("handleLent()", () => {

    afterEach(() => {
        logStore()
        clearStore()
    })

    test("Create Single Lending", () => {
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

        assertLendingFields(
            lendingId, 
            nftAddress, 
            tokenId, 
            lenderAddress, 
            maxRentDuration, 
            dailyRentPrice, 
            nftPrice, 
            paymentToken, 
            lentAmount, 
            isERC721, 
            1,
            false,
            newLentEvent.block.timestamp
        )
        assertCounterFields(1, 0, 1);
        assertUserFields(lenderAddress, 1);
        assertLendingRentingCounterFields(1, 0);
        // assertNftFields(nftAddress, tokenId, lentAmount);
    })

    test("Create Multiple Lendings by same user", () => {
        let numberOfEvents = 2;

        let nftAddress = "0x0000000000000000000000000000000000000001"
        let lenderAddress = "0x0000000000000000000000000000000000000002"
        let maxRentDuration = 1;
        let dailyRentPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
        let nftPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
        let paymentToken = 1;
        let lentAmount = 1;
        let isERC721 = true;

        let newLentEvents = createMultipleNewLentEvents(
            numberOfEvents,
            nftAddress,
            lenderAddress,
            maxRentDuration,
            dailyRentPrice,
            nftPrice,
            paymentToken,
            lentAmount,
            isERC721
        )

        newLentEvents.forEach(element => {
            handleLent(element)
        });

        assertCounterFields(numberOfEvents, 0, 1);
        assertUserFields(lenderAddress, 1);
        assertLendingRentingCounterFields(numberOfEvents, 0);
    })

})

