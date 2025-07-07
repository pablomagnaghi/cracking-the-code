import { isOneAway } from "../../../src/arrays-and-strings/15-one-edit-way";

describe("05 - oneAway", () => {
  test("One Away - Replace", () => {
    expect(isOneAway("pale", "bale")).toEqual(true); // Replacement
    expect(isOneAway("bbaa", "bcca")).toEqual(false); // Replacement
  });

  test("One Away - Replace", () => {
    expect(isOneAway("pale", "bale")).toEqual(true); // Replacement
  });

  test("One Away - Insert", () => {
    expect(isOneAway("pale", "ple")).toEqual(true); // Insertion
  });

  test("One Away - Remove", () => {
    expect(isOneAway("pale", "pales")).toEqual(true); // Removal
  });

  test("Same Strings", () => {
    expect(isOneAway("abc", "abc")).toEqual(true); // No edits
  });

  test("More Than One Edit Away", () => {
    expect(isOneAway("abcd", "efgh")).toEqual(false); // More than one edit away
  });

  test("More Than One Edit Away #2", () => {
    expect(isOneAway("palesa", "pale")).toEqual(false); // More than one edit away #2
  });

  test("Empty Strings", () => {
    expect(isOneAway("", "")).toEqual(true); // Empty strings are zero edits away
  });

  test("One Character Difference", () => {
    expect(isOneAway("a", "ab")).toEqual(true); // One character difference
  });

  test("Empty and Non-Empty String", () => {
    expect(isOneAway("", "a")).toEqual(true); // Empty string and a non-empty string
  });
});
