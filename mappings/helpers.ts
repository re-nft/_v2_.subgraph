import { Counter } from "../generated/schema";

export const fetchCounter = (): Counter => {
  let c = Counter.load('counter');
  if (c === null) {
    c = new Counter('counter');
    c.lending = 0;
    c.renting = 0;
    c.user = 0;

    c.save();
  }
  return <Counter>c;
}