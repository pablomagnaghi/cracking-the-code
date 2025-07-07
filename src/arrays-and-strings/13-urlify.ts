// 3.  URLify:

// Write a method to replace all spaces in a string with '%20'.
// You may assume that the string has sufficient space at the end to hold the additional characters,
// and that you are given the "true" length of the string.

export function URLify(str: string): string {
    return str.replace(/ /g, '%20');
}

export function URLifyWithTrueLength(str: string, trueLength: number): string {
    let result = '';
    for (let i = 0; i < trueLength; i++) {
        const c = str[i];
        result += c === ' ' ? '%20' : c;
    }
    return result;
}