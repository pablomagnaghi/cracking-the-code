// 06.07. The Apocalypse
//
// In the new post-apocalyptic world, the world queen is desperately
// concerned about the birth rate. Therefore, she decrees that all families
// should ensure that they have one girl or else they face massive fines.
// If all families abide by this policy -- that is, they continue to have
// children until they have one girl, at which point they immediately
// stop -- what will the gender ratio of the new generation be?
// (Assume that the odds of someone having a boy or a girl on any given
// pregnancy are equal.)
//
// Answer:
//   The gender ratio is approximately 1:1 (equal boys and girls).
//   Despite the stopping rule, the expected number of boys per family
//   equals the expected number of girls per family. Each family has
//   exactly 1 girl. The expected number of boys is:
//   0*(1/2) + 1*(1/4) + 2*(1/8) + ... = 1.
//   So the ratio of boys to girls converges to 1.0.
//
// Example:
//   Input: familiesCount = 1000000
//   Output: { boys: ~500000, girls: 1000000, ratio: ~1.0 }
//
// Constraints:
//   - Each pregnancy has a 50% chance of boy, 50% chance of girl
//   - Families stop after their first girl

// This simulation estimates the boy-to-girl ratio over many families.

export function runApocalypseSimulation(familiesCount: number = 1000000): {
  boys: number;
  girls: number;
  ratio: number;
} {
  let boys = 0;
  let girls = 0;

  for (let i = 0; i < familiesCount; i++) {
    while (true) {
      const child = Math.random() < 0.5 ? 'boy' : 'girl';
      if (child === 'boy') {
        boys++;
      } else {
        girls++;
        break;
      }
    }
  }

  const ratio = boys / girls;
  return { boys, girls, ratio };
}
