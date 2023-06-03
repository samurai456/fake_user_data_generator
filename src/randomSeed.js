import { faker } from '@faker-js/faker'

function getRandomSeed(){
    faker.seed();
    const seedLength = faker.number.int({min:1, max:64});
    return faker.string.sample(seedLength);
}

export { getRandomSeed }