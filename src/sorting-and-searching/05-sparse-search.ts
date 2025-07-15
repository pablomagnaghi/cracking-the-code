// 10.5: Sparse Search
//
// Given a sorted array of strings that is interspersed with empty strings,
// write a method to find the location of a given string.
//
// Example:
// Input: ["at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""], target = "ball"
// Output: 4 (index of "ball")

export function sparseSearch(arr: string[], target: string): number {
  return sparseSearchHelper(arr, target, 0, arr.length - 1);
}

function sparseSearchHelper(arr: string[], target: string, left: number, right: number): number {
  if (left > right) return -1;

  let mid = Math.floor((left + right) / 2);

  if (arr[mid] === '') {
    let leftMid = mid - 1;
    let rightMid = mid + 1;

    while (true) {
      if (leftMid < left && rightMid > right) return -1;
      else if (rightMid <= right && arr[rightMid] !== '') {
        mid = rightMid;
        break;
      } else if (leftMid >= left && arr[leftMid] !== '') {
        mid = leftMid;
        break;
      }
      rightMid++;
      leftMid--;
    }
  }

  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return sparseSearchHelper(arr, target, mid + 1, right);
  } else {
    return sparseSearchHelper(arr, target, left, mid - 1);
  }
}
