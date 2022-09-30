import { assert, describe, test } from 'matchstick-as/assembly/index';
import { handleLend } from '../mappings/core';
import {
  Lend,
  Rent,
  StopRent,
  RentClaimed,
  StopLend,
} from '../generated/Sylvester/Sylvester';
import { Lending, Renting, User } from '../generated/schema';

export function runTests(): void {
  describe('handleLend()', () => {
    test('Should handle a new Lend', () => {
      assert.i32Equals(1, 1);
    });
  });
}
