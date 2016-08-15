/**
 * Given a sorted array, find the value in O(lgn) time
 * @param  {Array}  arr A sorted array
 * @param  {Any}    val The value to search for in arr
 * @param  {Number} l   The left index to start search at (inclusive)
 * @param  {Number} r   The right index to end search at (exclusive)
 * @return {Number} The index of the value, or undefined
 */
export function binarySearch(arr, val, l, r) {
  const search = function search(l, r) {
    if (l === r) return arr[l] === val ? l : undefined;
    const mid = Math.floor((r + l) / 2);

    if (arr[mid] === val) return mid;
    if (arr[mid] > val) return search(l, mid);
    if (arr[mid] < val) return search(mid + 1, r);
  };
  return search(l || 0, r || arr.length);
};
