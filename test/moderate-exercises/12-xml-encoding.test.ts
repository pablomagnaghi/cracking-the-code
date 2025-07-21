import { encodeXML, Element } from '../../src/moderate-exercises/12-xml-enconding';

describe('encodeXML', () => {
  const tagMap = {
    family: 1,
    person: 2,
    firstName: 3,
    lastName: 4,
    state: 5,
  };

  test('encodes element with attributes and child', () => {
    const input: Element = {
      name: 'family',
      children: [
        {
          name: 'person',
          attributes: { firstName: 'John', lastName: 'Doe' },
          children: [{ name: 'state', text: 'CA' }],
        },
      ],
    };

    const expected = '1 0 2 3 John 4 Doe 0 5 0 CA 0 0 0';
    expect(encodeXML(input, tagMap)).toBe(expected);
  });

  test('encodes element with text only', () => {
    const input: Element = {
      name: 'state',
      text: 'NY',
    };

    const expected = '5 0 NY 0';
    expect(encodeXML(input, tagMap)).toBe(expected);
  });

  test('encodes element with no attributes or children', () => {
    const input: Element = { name: 'family' };
    const expected = '1 0 0';
    expect(encodeXML(input, tagMap)).toBe(expected);
  });

  test('encodes multiple nested elements', () => {
    const input: Element = {
      name: 'family',
      children: [
        {
          name: 'person',
          attributes: { firstName: 'Alice' },
          children: [{ name: 'state', text: 'TX' }],
        },
        {
          name: 'person',
          attributes: { firstName: 'Bob' },
          children: [{ name: 'state', text: 'FL' }],
        },
      ],
    };

    const expected = '1 0 2 3 Alice 0 5 0 TX 0 0 2 3 Bob 0 5 0 FL 0 0 0';
    expect(encodeXML(input, tagMap)).toBe(expected);
  });

  test('handles empty attributes and children', () => {
    const input: Element = {
      name: 'person',
      attributes: {},
      children: [],
    };

    const expected = '2 0 0';
    expect(encodeXML(input, tagMap)).toBe(expected);
  });
});
