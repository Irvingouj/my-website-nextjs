export type Second = number;

export default class Counter {
  count: number;
  constructor() {
    this.count = 0;
  }
  increment() {
    // convert from seconds to milliseconds
    this.count++;
    return {
      expires: (time: Second) => {
        setTimeout(() => {
          if (this.count > 0) {
            this.count--;
          }
        }, time * 1000);
      },
    };
  }

  getCount() {
    return this.count;
  }
}
