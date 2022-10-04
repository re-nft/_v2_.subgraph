import { BigInt } from '@graphprotocol/graph-ts';
import { test, describe, afterEach, clearStore, assert, beforeEach, logStore} from 'matchstick-as/assembly/index'
import { Lent } from '../../generated/Azrael/Azrael';
import {handleRented, handleLent} from "../../mappings/core";
import {createMultipleNewLentEvents, createNewRentedEvent, assertRentingFields, assertCounterFields, assertLendingRentingCounterFields, assertUserFields} from '../utils'

export {handleRented, handleLent}

const nftAddress = "0x0000000000000000000000000000000000000001"
const lenderAddress = "0x0000000000000000000000000000000000000002"
const maxRentDuration = 1;
const dailyRentPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
const nftPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
const paymentToken = 1;
const lentAmount = 1;
const isERC721 = true;


function createLendings(
    numberOfEvents: number
): Array<Lent>{
    let newLentEvents: Array<Lent> = createMultipleNewLentEvents(
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

    newLentEvents.forEach(event => {
        handleLent(event)
    });

    return newLentEvents
}

let lendings: Array<Lent>;

describe("Handle Rented Event(s)", () => {

    beforeEach(() => {
        lendings = new Array<Lent>();

        // populate lendings
        let lentEvents: Array<Lent> = createLendings(3)
        for(let i = 0; i < lentEvents.length; i++){
            lendings.push(lentEvents[i])
        }
    })

    afterEach(() => {
        clearStore()

        // clear lendings
        lendings = new Array<Lent>();
    })

    test("Handle Single Renting", () => {
        let lending = lendings[0];
        let lendingId = lending.params.lendingId.toString();
        let renterAddress = "0x0000000000000000000000000000000000000011"
        let rentedAt = lending.block.timestamp.plus(BigInt.fromI32(1)).toI32() // increment timestamp by 1
        let rentDuration = 1

        let rentedEvent = createNewRentedEvent(
            lendingId,
            renterAddress,
            rentDuration,
            rentedAt
        )

        handleRented(rentedEvent)

        assertRentingFields(lendingId, renterAddress, rentDuration, rentedAt)
        assertCounterFields(3, 1, 2)
        assertLendingRentingCounterFields(3, 1);
        assertUserFields(renterAddress, 2)
    })
})