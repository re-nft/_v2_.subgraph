import { test, describe, afterEach, clearStore, assert} from 'matchstick-as/assembly/index'
import {handleRented} from "../../mappings/core";

export {handleRented}

describe("Handle Rented Event(s)", () => {

    afterEach(() => {
        clearStore()
    })

    test("Handle Single Renting", () => {
        assert.assertTrue(true)
    })
})