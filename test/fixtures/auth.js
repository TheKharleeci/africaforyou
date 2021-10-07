import faker from 'faker';

const userPassword = 'africaforyou';


export const rightSignUpObj = {
    name: faker.random.alpha({ count: 3 }),
    email: faker.internet.email(),
    password: userPassword,
    phoneNumber: `${faker.datatype.number({ min: 9999999999, max: 99999999999 })}`,
};

export const invalidSignUpObj = {
    name: faker.random.alpha({ count: 3 }),
    email: faker.internet.email(),
    password: faker.internet.password(7),
};

export const duplicateSignUpObj = {
    name: faker.random.alpha({ count: 4 }),
    email: rightSignUpObj.email,
    password: faker.internet.password(7),
    phoneNumber: `${faker.datatype.number({ min: 9999999999, max: 99999999999 })}`,
};