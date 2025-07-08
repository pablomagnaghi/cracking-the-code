import { AnimalShelter } from '../../src/stacks-and-queues/36-animal-shelter';

describe('AnimalShelter', () => {
  test('enqueue only dogs and dequeueDog', () => {
    const shelter = new AnimalShelter();

    shelter.enqueue('dog');
    shelter.enqueue('dog');

    expect(shelter.dequeueDog()?.type).toBe('dog');
    expect(shelter.dequeueDog()?.type).toBe('dog');
    expect(shelter.dequeueDog()).toBeUndefined();
  });

  test('enqueue only cats and dequeueCat', () => {
    const shelter = new AnimalShelter();

    shelter.enqueue('cat');
    shelter.enqueue('cat');

    expect(shelter.dequeueCat()?.type).toBe('cat');
    expect(shelter.dequeueCat()?.type).toBe('cat');
    expect(shelter.dequeueCat()).toBeUndefined();
  });

  test('interleaved enqueue and dequeueAny', () => {
    const shelter = new AnimalShelter();

    shelter.enqueue('dog'); // order 0
    shelter.enqueue('cat'); // order 1
    expect(shelter.dequeueAny()?.type).toBe('dog');

    shelter.enqueue('dog'); // order 2
    expect(shelter.dequeueAny()?.type).toBe('cat');

    expect(shelter.dequeueAny()?.type).toBe('dog');
    expect(shelter.dequeueAny()).toBeUndefined();
  });

  test('enqueue after emptying the shelter', () => {
    const shelter = new AnimalShelter();

    expect(shelter.dequeueAny()).toBeUndefined();

    shelter.enqueue('cat');
    expect(shelter.dequeueAny()?.type).toBe('cat');

    shelter.enqueue('dog');
    expect(shelter.dequeueAny()?.type).toBe('dog');

    expect(shelter.dequeueAny()).toBeUndefined();
  });

  test('preserves FIFO order across types', () => {
    const shelter = new AnimalShelter();

    shelter.enqueue('cat'); // order 0
    shelter.enqueue('dog'); // order 1
    shelter.enqueue('cat'); // order 2
    shelter.enqueue('dog'); // order 3

    expect(shelter.dequeueAny()?.type).toBe('cat'); // order 0
    expect(shelter.dequeueDog()?.type).toBe('dog'); // order 1
    expect(shelter.dequeueCat()?.type).toBe('cat'); // order 2
    expect(shelter.dequeueAny()?.type).toBe('dog'); // order 3
  });
});
