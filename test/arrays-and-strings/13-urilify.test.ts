import { URLify, URLifyWithTrueLength } from '../../src/arrays-and-strings/13-urlify';

describe('URLify', () => {
  it('replaces single space with %20', () => {
    expect(URLify('a b')).toBe('a%20b');
  });

  it('works on string with no spaces', () => {
    expect(URLify('HelloWorld')).toBe('HelloWorld');
  });

  it('returns empty string for empty input', () => {
    expect(URLify('')).toBe('');
  });
});

describe('URLifyWithTrueLength', () => {
  it('mimics in-place URLify logic', () => {
    expect(URLifyWithTrueLength('Mr John Smith    ', 13)).toBe('Mr%20John%20Smith');
  });
});
