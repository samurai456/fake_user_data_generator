import { fakerDE, fakerFR, fakerSV, fakerES } from '@faker-js/faker'
import crc32 from 'crc-32'

function getFakerByLocale(locale){
    switch(locale){
        case 'de': return fakerDE;
        case 'fr': return fakerFR;
        case 'sv': return fakerSV;
        case 'es': return fakerES;
    }
}

function getFaker(locale, seed, page){
    const faker = getFakerByLocale(locale);
    const numSeed = crc32.str(seed);
    faker.seed([numSeed, page]);
    return faker
}

function generateFakeUserData(seed, page, locale, quontity=30, startIndex=1){
    const faker = getFaker(locale, seed, page);
    const arr = Array(quontity).fill(1);
    const fakeDatas = arr.map(()=>({
        index: startIndex++,
        uuid: faker.string.uuid(),
        name: faker.person.fullName(),
        address: getAddressByFaker(faker),
        phone: faker.phone.number(),
    }));
    return fakeDatas
}

function getAddressByFaker(faker){
    const addrFormats = [getAddressFormat1, getAddressFormat2];
    const chosenFormat = faker.helpers.arrayElement(addrFormats);
    const addr = chosenFormat(faker);
    return addr;
}

function getAddressFormat1(faker){
    return faker.location.city() + ', ' +
            faker.location.streetAddress() + ', ' +
            faker.location.secondaryAddress()
}

function getAddressFormat2(faker){
    return faker.location.state() + ', ' +
            faker.location.city() + ', ' +
            faker.location.streetAddress()
}

export { generateFakeUserData }