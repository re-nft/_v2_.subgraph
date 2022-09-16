import { User, Counter } from "../generated/schema";

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

export const fetchUser = (address: String): User => {
  let user = User.load(<string>address);
  if (user === null) {
    let counter = fetchCounter();
    user = new User(<string>address);
    counter.user = counter.user + 1;
    user.cursor = counter.user;

    counter.save();
    user.save();
  }
  return <User>user;
};