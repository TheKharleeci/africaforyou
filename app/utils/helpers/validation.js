import joi from 'joi';

/**
 * contains validation helpers
 *
 * @class ValidationHelper
 */
class ValidationHelper {
  /**
   * It validates a number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static numberCheck(param, min = 1, max = 10000000000) {
    return joi
      .number()
      .required()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'number.base': `${param} must be a number`,
        'number.empty': `${param} cannot be an empty field`,
        'number.min': `${param} can not be lesser than ${min}`,
        'number.max': `${param} can not be greater than ${max}`
      });
  }

  /**
   * It validates a string.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static stringCheck(param, min = 1, max = 1000000000) {
    return joi
      .string()
      .required()
      .trim()
      .min(min)
      .max(max)
      .messages({
        'any.required': `${param} is a required field`,
        'string.max': `${param} can not be greater than ${max} characters`,
        'string.min': `${param} can not be lesser than ${min} characters`,
        'string.base': `${param} must be a string`,
        'string.empty': `${param} cannot be an empty field`,
      });
  }

  /**
   * It validates a date.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static dateCheck(param) {
    return joi
      .date()
      .required()
      .messages({
        'any.required': `${param} is a required field`,
        'date.base': `${param} must be a correct date`,
        'string.empty': `${param} cannot be an empty field`
      });
  }

  /**
   * It validates a password.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static passwordCheck() {
    return joi.string().trim().required().min(7)
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password field cannot be an empty field',
        'any.required': 'Password field is required',
        'string.min': 'Password can not be lesser than 7 characters'
      });
  }

  /**
   * It validates a string that is not required.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editStringCheck(param, min = 1, max = 120000000000) {
    return joi
      .string()
      .min(min)
      .max(max)
      .trim()
      .empty()
      .messages({
        'string.base': `${param}  must be a string`,
        'string.empty': `${param} cannot be an empty field`,
        'string.min': `${param} can not be lesser than ${min} characters`,
        'string.max': `${param} can not be greater than ${max} characters`
      });
  }

  /**
   * It validates a number that is not required.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editNumberCheck(param) {
    return joi.number().messages({
      'number.base': `${param}  must be a number`,
    });
  }

  /**
   * It validates a phone number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static phoneNumberCheck() {
    return joi.string().pattern(new RegExp('^[0-9]{11}$')).required().messages({
      'string.pattern.base':
        'Phone Number must be 11 digits',
      'string.empty': 'Phone Number must not be an empty field',
      'any.required': 'Phone Number is a required field'
    });
  }

  /**
   * It validates a phone number that is not required.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editPhoneCheck() {
    return joi.string().pattern(new RegExp('^[0-9]{11}$')).messages({
      'string.pattern.base':
        'Phone Number must be 11 digits',
      'string.empty': 'Phone Number must not be an empty field',
      'any.required': 'Phone Number is a required field'
    });
  }

  /**
   * It validates a string is part of an enum.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static enumCheck(fields, param) {
    return joi
      .string()
      .required()
      .valid(...fields)
      .messages({
        'string.empty': `${param} must not be an empty field`,
        'any.required': `${param} is a required field`,
        'any.only': `Please enter a valid ${param}`
      });
  }

  /**
   * It validates a string is part of an enum.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editEnumCheck(fields, param) {
    return joi
      .string()
      .valid(...fields)
      .messages({
        'any.only': `Please enter a valid ${param}`
      });
  }

  /**
   * It validates an array.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static arrayStringCheck(param) {
    return joi
      .array()
      .items(joi.string())
      .required()
      .messages({
        'array.empty': `${param} is a required field`,
        'array.base': `${param} must be a valid array`,
        'any.required': `${param} cannot be an empty field`
      });
  }

  static editArrayStringCheck(param) {
    return joi
      .array()
      .items(joi.string())
      .messages({
        'array.empty': `${param} is a required field`,
        'array.base': `${param} must be a valid array`,
        'any.required': `${param} cannot be an empty field`
      });
  }

  static editArrayObjectCheck(param) {
    return joi
      .array()
      .items(joi.object())
      .messages({
        'array.empty': `${param} is a required field`,
        'array.base': `${param} must be a valid array`,
        'any.required': `${param} cannot be an empty field`
      });
  }

  /**
   * It validates a date that is not required.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editDateCheck(param) {
    return joi.date().messages({
      'any.required': `${param} is a required field`,
      'date.base': `${param} must be a correct date`,
      'string.empty': `${param} cannot be an empty field`
    });
  }

  /**
   * It validates a email
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static emailCheck() {
    return joi.string().email().required().messages({
      'any.required': 'Email is a required field',
      'string.email': 'Email is not valid',
      'string.empty': 'Email cannot be an empty field'
    });
  }

  /**
   * It validates a phone number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static regexNumberCheck(param) {
    return joi
      .string()
      .required()
      .pattern(new RegExp('^[0-9]{10,14}$'))
      .messages({
        'string.pattern.base': `${param} must be a number between 11 and 14 digits`,
        'string.empty': `${param} must not be an empty field`,
        'any.required': `${param}  is a required field`
      });
  }

  /**
   * It validates a phone number.
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editRegexNumberCheck(param) {
    return joi
      .string()
      .pattern(new RegExp('^[0-9]{10,14}$'))
      .messages({
        'string.pattern.base': `${param} must be a number between 11 and 14 digits`,
        'string.empty': `${param} must not be an empty field`,
        'any.required': `${param}  is a required field`
      });
  }

  /**
   * It validates a email
   * @static
   * @memberof ValidationHelper
   * @returns {Boolean}
   */
  static editEmailCheck() {
    return joi.string().email().messages({
      'string.email': 'Email is not valid',
      'string.empty': 'Email cannot be an empty field'
    });
  }
}
export default ValidationHelper;
