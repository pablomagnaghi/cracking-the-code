import { daysUntilBlueEyedPeopleLeave } from '../../src/math/06-blue-eyed-island';

describe('daysUntilBlueEyedPeopleLeave', () => {
  test('returns 0 when no blue-eyed people', () => {
    expect(daysUntilBlueEyedPeopleLeave(0)).toBe(0);
  });

  test('returns 1 when there is 1 blue-eyed person', () => {
    expect(daysUntilBlueEyedPeopleLeave(1)).toBe(1);
  });

  test('returns 2 when there are 2 blue-eyed people', () => {
    expect(daysUntilBlueEyedPeopleLeave(2)).toBe(2);
  });

  test('returns 3 when there are 3 blue-eyed people', () => {
    expect(daysUntilBlueEyedPeopleLeave(3)).toBe(3);
  });

  test('returns 100 when there are 100 blue-eyed people', () => {
    expect(daysUntilBlueEyedPeopleLeave(100)).toBe(100);
  });

  test('returns 0 for negative input', () => {
    expect(daysUntilBlueEyedPeopleLeave(-1)).toBe(0);
  });

  test('returns 1000 when there are 1000 blue-eyed people', () => {
    expect(daysUntilBlueEyedPeopleLeave(1000)).toBe(1000);
  });

  test('returns 5 when there are 5 blue-eyed people', () => {
    expect(daysUntilBlueEyedPeopleLeave(5)).toBe(5);
  });

  test('returns 10 when there are 10 blue-eyed people', () => {
    expect(daysUntilBlueEyedPeopleLeave(10)).toBe(10);
  });

  test('result always equals input for positive counts', () => {
    for (let n = 1; n <= 50; n++) {
      expect(daysUntilBlueEyedPeopleLeave(n)).toBe(n);
    }
  });
});
