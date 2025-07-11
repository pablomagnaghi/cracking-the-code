// 6.2 Basketball
//
// You have a basketball hoop and someone says that you can play one of two games:
// Game 1: You get one shot to make the hoop.
// Game 2: You get three shots and you have to make at least two of them.
// Write a function to calculate the probability of winning each game,
// and return which game you should choose to maximize your chances of winning.

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
