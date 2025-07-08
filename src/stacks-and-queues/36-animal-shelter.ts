// 6. *Animal Shelter*:

// An animal shelter, which holds only dogs and cats, operates on a strictly
// "first in, first out" basis. People must adopt either the "oldest"
// (based on arrival time) of all animals at the shelter,
// or they can select whether they would prefer a dog or a cat
// (and will receive the oldest animal of that type).
// They cannot select which specific animal they would like.
// Create the data structures to maintain this system and implement operations
// such as enqueue, dequeueAny, dequeueDog, and dequeueCat.
// You may use the built-in LinkedList data structure.

export type AnimalType = 'dog' | 'cat';

export class Animal {
  type: AnimalType;
  order: number;

  constructor(type: AnimalType, order: number) {
    this.type = type;
    this.order = order;
  }
}

export class AnimalShelter {
  private dogs: Animal[];
  private cats: Animal[];
  private orderCounter: number;

  constructor() {
    this.dogs = [];
    this.cats = [];
    this.orderCounter = 0;
  }

  enqueue(type: AnimalType): void {
    const animal = new Animal(type, this.orderCounter++);
    if (type === 'dog') {
      this.dogs.push(animal);
    } else {
      this.cats.push(animal);
    }
  }

  dequeueAny(): Animal | undefined {
    if (this.dogs.length === 0 && this.cats.length === 0) {
      return undefined;
    }
    if (this.dogs.length === 0) {
      return this.dequeueCat();
    }
    if (this.cats.length === 0) {
      return this.dequeueDog();
    }

    if (this.dogs[0].order < this.cats[0].order) {
      return this.dequeueDog();
    } else {
      return this.dequeueCat();
    }
  }

  dequeueDog(): Animal | undefined {
    return this.dogs.shift();
  }

  dequeueCat(): Animal | undefined {
    return this.cats.shift();
  }
}
