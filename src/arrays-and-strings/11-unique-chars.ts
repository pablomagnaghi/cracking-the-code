// 1. *Is Unique*:

// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

export function isUnique(str: string) {
    const charsSet = new Set<string>();

    for (const c of str) {
        if (charsSet.has(c)) {
            return false;
        }
        charsSet.add(c);
    }

    return true;
}
