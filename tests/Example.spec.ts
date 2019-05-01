class Queue<T> {
  protected items: T[] = [];

  get length() {
    return this.items.length;
  }

  get first(): T | null {
    return this.items[0] || null;
  }

  get last(): T | null {
    return this.items[this.length - 1] || null;
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  enqueues(...elements: T[]): number {
    return this.items.push(...elements);
  }

  dequeues(): T | null {
    return this.items.shift() || null;
  }

  clear(): void {
    this.items = [];
  }
}

interface Fruit {
  name: string;
  weight: number;
}

describe('Example testing suite', () => {
  let queue: Queue<Fruit>;
  const apple = { name: 'apple', weight: 40 };
  const banana = { name: 'banana', weight: 30 };

  beforeEach(() => {
    queue = new Queue<Fruit>();
  });

  afterEach(() => {
    queue = undefined;
  });

  it('enqueues may insert multiple task in the same time', () => {
    expect(queue.enqueues(apple, banana)).toBe(2);
  });

  it('dequeues should extract the last task of queue', () => {
    queue.enqueues(apple, banana);
    expect(queue.dequeues()).toBe(apple);
    expect(queue.length).toBe(1);
  });

  it('clear method should remove all task of queue.items', () => {
    queue.enqueues(apple);
    queue.clear();
    expect(queue.isEmpty).toBe(true);
  });

  it('#length should get correct length', () => {
    queue.enqueues(apple, banana);
    expect(queue.length).toBe(2);
  });

  it('#first should get first element of queue', () => {
    queue.enqueues(apple, banana);
    expect(queue.first).toBe(apple);
  });

  it('#last should get last element of queue', () => {
    queue.enqueues(apple, banana);
    expect(queue.last).toBe(banana);
  });

  it('#isEmpty should only return true when items is empty', () => {
    expect(queue.isEmpty).toBe(true);
    queue.enqueues(apple);
    expect(queue.isEmpty).toBe(false);
  });
});
