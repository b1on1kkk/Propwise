import type { TOnlineUsers } from "../interfaces/interfaces";

export function binarySearch(
  arr: TOnlineUsers[],
  key: number
): number | string {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid].user_id === key) {
      return arr[mid].socket_id;
    } else if (arr[mid].user_id < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
