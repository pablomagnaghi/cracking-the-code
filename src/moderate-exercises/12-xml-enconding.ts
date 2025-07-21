// 16.12 XML Encoding
//
// Problem: Encode an XML-like element (with attributes, children, and optional text)
// into a compact integer-tagged format using a tag map.
// Each element is encoded as:
//   [tagId] [attrKeyId] [attrValue] ... 0 [text?] [encoded children] 0

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
