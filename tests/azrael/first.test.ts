import { test, describe, afterEach, clearStore} from 'matchstick-as/assembly/index'
import {handleLent} from "../../mappings/core";
import {assertCounterFields, assertLendingFields, assertUserFields, createNewLentEvent} from "../utils";

export {handleLent}

describe("handleLent()", () => {

    afterEach(() => {
        clearStore()
    })

    test("Create Lending", () => {
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
    })

})

