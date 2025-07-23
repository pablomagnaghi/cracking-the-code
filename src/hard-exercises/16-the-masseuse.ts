// 17.16 The Masseuse
//
// Problem:
// A masseuse receives a list of appointment requests represented by their durations in minutes.
// She cannot accept any adjacent appointments (appointments that overlap or are back-to-back).
// Find the maximum total duration of appointments she can accept without violating this rule.

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
