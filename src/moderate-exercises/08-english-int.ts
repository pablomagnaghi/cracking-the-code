// 16.8. English Integer
//
// Write a function to convert an integer into its English phrase representation.
// Example: 123 → "One Hundred Twenty Three"

const belowTwenty = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];

const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const thousands = ['', 'Thousand', 'Million', 'Billion'];

export function numberToWords(num: number): string {
  if (num === 0) return 'Zero';

  let i = 0;
  let words: string[] = [];

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      let chunkWords = convertHundred(chunk);
      if (thousands[i]) chunkWords += ' ' + thousands[i];
      words.unshift(chunkWords);
    }
    num = Math.floor(num / 1000);
    i++;
  }

  return words.join(' ');
}

function convertHundred(num: number): string {
  let result = '';

  if (num >= 100) {
    result += belowTwenty[Math.floor(num / 100)] + ' Hundred';
    num %= 100;
    if (num > 0) result += ' ';
  }

  if (num >= 20) {
    result += tens[Math.floor(num / 10)];
    if (num % 10 > 0) result += ' ' + belowTwenty[num % 10];
  } else if (num > 0) {
    result += belowTwenty[num];
  }

  return result;
}
