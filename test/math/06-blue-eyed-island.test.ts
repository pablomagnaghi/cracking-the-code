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
});
