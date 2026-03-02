// 16.12. XML Encoding
//
// Since XML is very verbose, you are given a way of encoding it where each tag gets
// mapped to a pre-defined integer value. The language/grammar is as follows:
//   Element   --> Tag Attributes END Children END
//   Attribute --> Tag Value
//   END       --> 0
//   Tag       --> some predefined mapping to int
//   Value     --> string value
//
// Write code to print the encoded version of an XML element (passed in as Element
// and Attribute objects).
//
// Example:
//   Input (XML):
//     <family lastName="McDowell" state="CA">
//       <person firstName="Gayle">Some Message</person>
//     </family>
//
//   Tag mapping: family -> 1, person -> 2, firstName -> 3, lastName -> 4, state -> 5
//
//   Output: "1 4 McDowell 5 CA 0 2 3 Gayle 0 Some Message 0 0"
//
// Constraints:
//   - Each tag and attribute name maps to a known integer via the tag map
//   - END (0) marks the end of an attribute list and the end of an element
//   - Elements can be nested arbitrarily deep
//   - An element may have text content, attributes, children, or any combination

export interface Element {
  name: string;
  attributes?: Record<string, string>;
  children?: Element[];
  text?: string;
}

export function encodeXML(elem: Element, tagMap: Record<string, number>): string {
  const parts: string[] = [];
  encodeElement(elem, tagMap, parts);
  return parts.join(' ');
}

function encodeElement(elem: Element, tagMap: Record<string, number>, parts: string[]): void {
  // Push tag ID
  parts.push(tagMap[elem.name].toString());

  // Encode attributes correctly
  if (elem.attributes) {
    for (const [key, value] of Object.entries(elem.attributes)) {
      parts.push(tagMap[key].toString()); // attribute key id
      parts.push(value); // attribute value
    }
  }

  // Push single zero to mark end of attributes
  parts.push('0');

  // Text content if exists
  if (elem.text) {
    parts.push(elem.text);
  }

  // Encode children recursively
  if (elem.children) {
    for (const child of elem.children) {
      encodeElement(child, tagMap, parts);
    }
  }

  // Push zero to mark end of element
  parts.push('0');
}
