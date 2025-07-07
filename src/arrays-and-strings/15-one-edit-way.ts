// 5. *One Away*:

// There are three types of edits that can be performed on strings:
// insert a character, remove a character, or replace a character.
// Given two strings, write a function to check if they are one edit (or zero edits) away.

export function isOneAway(str1: string, str2: string): boolean {
  if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  }

  const shorter = str1.length < str2.length ? str1 : str2;
  const longer = str1.length < str2.length ? str2 : str1;

  let indexShorter = 0;
  let indexLonger = 0;
  let foundDifference = false;

  while (indexShorter < shorter.length && indexLonger < longer.length) {
    if (shorter[indexShorter] !== longer[indexLonger]) {
      // More than one difference found → false
      if (foundDifference) {
        return false;
      }
      foundDifference = true;

      if (shorter.length === longer.length) {
        // If same length, move both pointers (replace case)
        indexShorter++;
      }
      // If lengths differ, move only longer pointer (insert/remove case)
      indexLonger++;
    } else {
      indexShorter++;
      indexLonger++;
    }
  }

  return true;
}
