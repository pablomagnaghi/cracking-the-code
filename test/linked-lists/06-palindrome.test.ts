import { isPalindrome, Node } from '../../src/linked-lists/06-palindrome';

function buildList(values: number[]): Node<number> | undefined {
  if (values.length === 0) return undefined;
  const head: Node<number> = { value: values[0] };
  let current = head;
  for (let i = 1; i < values.length; i++) {
    current.next = { value: values[i] };
    current = current.next;
  }
  return head;
}

describe('isPalindrome', () => {
  test('returns true for a palindrome list (even length)', () => {
    const list = buildList([1, 2, 3, 3, 2, 1]);
    expect(isPalindrome(list)).toBe(true);
  });

  test('returns true for a palindrome list (odd length)', () => {
    const list = buildList([1, 2, 3, 2, 1]);
    expect(isPalindrome(list)).toBe(true);
  });

  test('returns false for a non-palindrome list', () => {
    const list = buildList([1, 2, 3, 4, 5]);
    expect(isPalindrome(list)).toBe(false);
  });

  test('returns false for undefined (empty list)', () => {
    expect(isPalindrome(undefined)).toBe(false);
  });

  test('returns true for single-node list', () => {
    const list = buildList([42]);
    expect(isPalindrome(list)).toBe(true);
  });
});
