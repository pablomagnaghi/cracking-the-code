// 5.2 *Binary to String*:
//
// Given a real number between 0 and 1 (e.g., 0.72) that is passed in as a double,
// print the binary representation. If the number cannot be represented accurately
// in binary with at most 32 characters, print "ERROR".

export default function binaryToString(num: number): string {
  if (num <= 0 || num >= 1) return 'ERROR';

  let binary = '0.';
  let fraction = num;

  while (binary.length <= 34) {
    // 2 chars for "0." + 32 bits max
    fraction *= 2;

    if (fraction >= 1) {
      binary += '1';
      fraction -= 1;
    } else {
      binary += '0';
    }

    if (fraction === 0) {
      return binary;
    }
  }

  return 'ERROR';
}
