import Joi from 'joi';
import { helpers } from '../utils';

const { ValidationHelper: { stringCheck, emailCheck, passwordCheck,
  phoneNumberCheck  } } = helpers;

export const signUpSchema = Joi.object({
  name: stringCheck('name', 2),
  email: emailCheck(),
  password: passwordCheck(),
  phoneNumber: phoneNumberCheck(),
});

export const forgotPasswordSchema = Joi.object({
  email: emailCheck()
});

