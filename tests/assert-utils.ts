import {assert} from 'matchstick-as/assembly/index'
import {BigInt} from '@graphprotocol/graph-ts'
import { Renting } from "../generated/schema";

export const RENTING_ENTITY = "Renting";
export const LENDING_ENTITY = "Lending";
export const COUNTER_ENTITY = "Counter";
export const USER_ENTITY = "User";
export const NFT_ENTITY = "Nft";

export function assertRentingFields(
    lendingId: string,
    renterAddress: string,
    rentDuration: i32,
    rentedAt: i32,
    cursor: i32
): void {
    assert.fieldEquals(RENTING_ENTITY, lendingId, "id", lendingId);
    assert.fieldEquals(RENTING_ENTITY, lendingId, "renterAddress", renterAddress);
    assert.fieldEquals(RENTING_ENTITY, lendingId, "rentedAt", rentedAt.toString());
    assert.fieldEquals(RENTING_ENTITY, lendingId, "rentDuration", rentDuration.toString());
    assert.fieldEquals(RENTING_ENTITY, lendingId, "lending", lendingId);
    assert.fieldEquals(RENTING_ENTITY, lendingId, "cursor", cursor.toString());
}

export function assertLendingFields(
    id: string,
    nftAddress: string,
    tokenId: i32,
    lenderAddress: string,
    maxRentDuration: i32,
    dailyRentPrice: string,
    nftPrice: string,
    paymentToken: i32,
    lentAmount: i32,
    isERC721: boolean,
    cursor: i32,
    collateralClaimed: boolean,
    lentAt: BigInt,
    hasRenting: boolean = false,
): void {
    assert.fieldEquals(LENDING_ENTITY, id, "nftAddress", nftAddress)
    assert.fieldEquals(LENDING_ENTITY, id, "tokenId", tokenId.toString())
    assert.fieldEquals(LENDING_ENTITY, id, "lenderAddress", lenderAddress)
    assert.fieldEquals(LENDING_ENTITY, id, "maxRentDuration", maxRentDuration.toString())
    assert.fieldEquals(LENDING_ENTITY, id, "dailyRentPrice", dailyRentPrice)
    assert.fieldEquals(LENDING_ENTITY, id, "nftPrice", nftPrice)
    assert.fieldEquals(LENDING_ENTITY, id, "paymentToken", paymentToken.toString())
    assert.fieldEquals(LENDING_ENTITY, id, "lentAmount", lentAmount.toString())
    assert.fieldEquals(LENDING_ENTITY, id, "isERC721", isERC721.toString())
    assert.fieldEquals(LENDING_ENTITY, id, "cursor", cursor.toString())
    assert.fieldEquals(LENDING_ENTITY, id, "collateralClaimed", collateralClaimed.toString())
    assert.fieldEquals(LENDING_ENTITY, id, "lentAt", lentAt.toString())

    if (hasRenting) {
        let renting = Renting.load(id);
        
        assert.assertNotNull(renting);
    } else {
        let renting = Renting.load(id);
        
        assert.assertNull(renting);
    }
}

export function assertCounterFields(
    lendingCount: i32,
    rentingCount: i32,
    userCount: i32
): void{
    assert.fieldEquals(COUNTER_ENTITY, "counter", "lending", lendingCount.toString())
    assert.fieldEquals(COUNTER_ENTITY, "counter", "renting", rentingCount.toString())
    assert.fieldEquals(COUNTER_ENTITY, "counter", "user", userCount.toString())
}

export function assertUserFields(
    address: string,
    cursor: i32
): void {
    assert.fieldEquals(USER_ENTITY, address, "id", address)
    assert.fieldEquals(USER_ENTITY, address, "cursor", cursor.toString())
}

export function assertNftFields(
    lendingId: string
): void {
    assert.fieldEquals(NFT_ENTITY, lendingId, "id", lendingId)
}
