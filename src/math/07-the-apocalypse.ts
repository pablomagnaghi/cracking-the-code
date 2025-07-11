// 6.7. The Apocalypse
//
// In the new post-apocalyptic world, the world queen is desperately concerned about the birth rate.
// Therefore, she decrees that all families should ensure that they have one girl or else they must continue to have children until they do.
// If they have a girl, they stop. If they have a boy, they continue. All families are guaranteed to have children until they have one girl.
// What is the expected ratio of boys to girls in the country?

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
