// 06.02. Basketball
//
// You have a basketball hoop and someone says that you can play one of two
// games.
//   Game 1: You get one shot to make the hoop.
//   Game 2: You get three shots and you have to make two of three shots.
// If p is the probability of making a particular shot, for which values of p
// should you pick one game or the other?
//
// The probability of winning Game 1 is p.
// The probability of winning Game 2 (at least 2 of 3) is:
//   P = 3*p^2*(1-p) + p^3 = 3p^2 - 2p^3
// You should pick Game 1 when p > 3p^2 - 2p^3, i.e. when 1 > 3p - 2p^2,
// which simplifies to 2p^2 - 3p + 1 > 0, or (2p - 1)(p - 1) > 0.
// This holds for p < 0.5.
//
// Example:
//   Input: p = 0.6
//   Game 1 probability = 0.6
//   Game 2 probability = 3*(0.36)*(0.4) + 0.216 = 0.648
//   Output: "Game 2"
//
//   Input: p = 0.2
//   Game 1 probability = 0.2
//   Game 2 probability = 3*(0.04)*(0.8) + 0.008 = 0.104
//   Output: "Game 1"
//
// Constraints:
//   - 0 <= p <= 1

export function chooseBetterGame(prob: number): 'Game 1' | 'Game 2' {
  // Game 1 probability
  const game1 = prob;

  // Game 2: probability of hitting at least 2 out of 3 shots
  // = P(2 shots made) + P(3 shots made)
  const miss = 1 - prob;
  const p2Hits =
    3 * prob * prob * miss + // (hit, hit, miss) in any order
    prob * prob * prob; // (hit, hit, hit)

  return game1 > p2Hits ? 'Game 1' : 'Game 2';
}
