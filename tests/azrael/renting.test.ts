import { test, describe, afterEach, clearStore, assert} from 'matchstick-as/assembly/index'
import {handleRented} from "../../mappings/core";

export {handleRented}

describe("handleRented()", () => {

    afterEach(() => {
        clearStore()
    })

    test("Create Single Renting", () => {
        assert.assertTrue(true)
    })
})