import { ContinuousMedianHandler } from '../../src/hard-exercises/20-continuous-median';

describe('ContinuousMedianHandler', () => {
  test('handles multiple numbers', () => {
    const cm = new ContinuousMedianHandler();
    const inputs = [5, 15, 1, 3];
    const expectedMedians = [5, 10, 5, 4];
    for (let i = 0; i < inputs.length; i++) {
      cm.insert(inputs[i]);
      expect(cm.getMedian()).toBe(expectedMedians[i]);
    }
  });

  test('works with single element', () => {
    const cm = new ContinuousMedianHandler();
    cm.insert(10);
    expect(cm.getMedian()).toBe(10);
  });

  test('returns 0 for empty input', () => {
    const cm = new ContinuousMedianHandler();
    expect(cm.getMedian()).toBe(0);
  });

  test('handles even number of inputs', () => {
    const cm = new ContinuousMedianHandler();
    cm.insert(1);
    cm.insert(2);
    expect(cm.getMedian()).toBe(1.5);
  });

  test('handles odd number of inputs', () => {
    const cm = new ContinuousMedianHandler();
    cm.insert(1);
    cm.insert(2);
    cm.insert(3);
    expect(cm.getMedian()).toBe(2);
  });
});
