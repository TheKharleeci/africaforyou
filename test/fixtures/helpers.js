import faker from 'faker';
import Joi from 'joi';
import { helpers } from '../../app/utils';

const {
  stringCheck,
  passwordCheck,
  emailCheck,
  numberCheck,
  phoneNumberCheck,
  enumCheck,
  dateCheck
} = helpers.ValidationHelper;
export const originText = 'hir35676';
export const wrongText = '894jdkf';
export const payload = 'payload';
export const total = 8;
export const limit = 2;
export const genericErrorObj = {
  status: 500,
  name: 'ApiError',
  message: 'Oops, something broke on the server!!!'
};
export const genericNotFound = {
  status: 404,
  message: 'Oops, You have reached a dead end'
};
export const genericUnAuthorized = {
  status: 403,
  message: 'Permission denied. Invalid credentials provided'
};
export const genericInValidLogin = {
  status: 401,
  message: 'Incorrect login details'
};
export const genericAuthRequired = {
  status: 401,
  message: 'Access denied, a valid access token is required'
};

export const testSchema = Joi.object({
  email: emailCheck(),
  password: passwordCheck(),
  name: stringCheck('name'),
  number: numberCheck('number', 1, 100),
  phoneNumber: phoneNumberCheck(),
  valid: enumCheck([false, true], 'valid'),
  date: dateCheck('Date')
});

export const testObj = {
  email: faker.internet.email(),
  password: faker.internet.email(),
  name: faker.internet.userName(),
  number: faker.datatype.number({ min: 1, max: 100 }),
  phoneNumber: '12909899789',
  valid: faker.datatype.boolean(),
  date: faker.date.future()
};

export const testError = {
  error: {
    message: faker.lorem.sentence()
  },
  status: faker.lorem.word()
};
