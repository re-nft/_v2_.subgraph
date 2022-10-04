import { BigInt } from '@graphprotocol/graph-ts';
import { test, describe, afterEach, clearStore, assert, beforeEach, logStore} from 'matchstick-as/assembly/index'
import { Lent, Rented } from '../../generated/Azrael/Azrael';
import {handleRented, handleLent} from "../../mappings/core";
import {createMultipleNewLentEvents, createNewRentedEvent, assertRentingFields, assertCounterFields, assertLendingRentingCounterFields, assertUserFields, createMultipleNewRentedEvents} from '../utils'

export {handleRented, handleLent}

const nftAddress = "0x0000000000000000000000000000000000000001"
const lenderAddress = "0x0000000000000000000000000000000000000002"
const maxRentDuration = 1;
const dailyRentPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
const nftPrice = "0x0000000000000000000000000000000000000000000000000000000000000001";
const paymentToken = 1;
const lentAmount = 1;
const isERC721 = true;


const LENDING_COUNT = 5;

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
        let lentEvents: Array<Lent> = createLendings(LENDING_COUNT);
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

        let rentedEvent: Rented = createNewRentedEvent(
            lendingId,
            renterAddress,
            rentDuration,
            rentedAt
        )

        handleRented(rentedEvent)

        assertRentingFields(lendingId, renterAddress, rentDuration, rentedAt, 1)
        assertCounterFields(lendings.length, 1, 2)
        assertLendingRentingCounterFields(lendings.length, 1);
        assertUserFields(renterAddress, 2)
    })

    test("Handle Multiple Rentings by same user", () => {
        let renterAddress = "0x0000000000000000000000000000000000000011"
        let rentedAtOffset = 1; // increment timestamp by 1
        let rentDuration = 1

        let newRentedEvents: Array<Rented> = createMultipleNewRentedEvents(
            lendings,
            renterAddress,
            rentDuration,
            rentedAtOffset
        )

        newRentedEvents.forEach(event => {
            handleRented(event)
        })

        for(let i = 0; i < newRentedEvents.length; i++){
            // use lendings here
            let lendingId = lendings[i].params.lendingId.toString();
            let rentedAt = lendings[i].block.timestamp.plus(BigInt.fromI32(rentedAtOffset)).toI32();

            assertRentingFields(lendingId, renterAddress, rentDuration, rentedAt, i+1);
        }

        assertCounterFields(lendings.length, newRentedEvents.length, 2)
        assertLendingRentingCounterFields(lendings.length, newRentedEvents.length);
        assertUserFields(renterAddress, 2)
    })
})