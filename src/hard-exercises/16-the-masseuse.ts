// LCCI 17.16. The Masseuse
//
// A popular masseuse receives a sequence of back-to-back appointment requests
// and is debating which ones to accept. She needs a break between appointments
// and therefore she cannot accept any adjacent requests. Given a sequence of
// back-to-back appointment requests, find the optimal (highest total booked
// minutes) set the masseuse can honor. Return the number of minutes.
//
// Example 1:
//   Input: [1,2,3,1]
//   Output: 4  (Accept requests 1 and 3: 1+3=4)
//
// Example 2:
//   Input: [2,7,9,3,1]
//   Output: 12  (Accept requests 1, 3, 5: 2+9+1=12)
//
// Example 3:
//   Input: [2,1,4,5,3,1,1,3]
//   Output: 12  (Accept requests 1, 3, 5, 8: 2+4+3+3=12)

export function maxMassageTime(appointments: number[]): number {
  if (appointments.length === 0) return 0;
  if (appointments.length === 1) return appointments[0];

  let prevPrevMax = 0; // max sum including up to appointment i-2
  let prevMax = 0; // max sum including up to appointment i-1

  for (const time of appointments) {
    const currentMax = Math.max(prevMax, prevPrevMax + time);
    prevPrevMax = prevMax;
    prevMax = currentMax;
  }

  return prevMax;
}
