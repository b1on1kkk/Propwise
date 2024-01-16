import type { TOnlineUsers } from "../interfaces/interfaces";

export function quickSort(arr: TOnlineUsers[]): TOnlineUsers[] {
  if (arr.length <= 1) {
    return arr;
  } else {
    const left: TOnlineUsers[] = [];
    const right: TOnlineUsers[] = [];
    const pivot: TOnlineUsers = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].user_id < pivot.user_id) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat(pivot, quickSort(right));
  }
}
