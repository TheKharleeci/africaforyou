import { helpers, ApiError, constants } from '../../utils';

const {
  GenericHelper: { errorResponse, validateInput }
} = helpers;
const { PARAM_ABSENT, EMPTY_FILE } = constants;
/**
 * A collection of middleware methods used to validate requests
 * @class ValidationMiddleware
 */
class ValidationMiddleware {
  /**
   * @param {Object} schema - Object to be validated
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof ValidationMiddleware
   */
  static validate(schema) {
    return async (req, res, next) => {
      try {
        await validateInput(schema, req.body);
        next();
      } catch (error) {
        const apiError = new ApiError({
          status: 400,
          message: error.details[0].message
        });
        errorResponse(req, res, apiError);
      }
    };
  }

  /**
   * @param {Object} schema - Object to be validated
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof ValidationMiddleware
   */
  static validateParam(schema) {
    return (req, res, next) => {
      const data = req.params[schema];
      if (data.length === 36) {
        return next();
      }
      errorResponse(
        req,
        res,
        new ApiError({
          status: 400,
          message: PARAM_ABSENT(schema)
        })
      );
    };
  }

  /**
   * check if file exists
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof ValidationMiddleware
   *
   */
  static validateFile(req, res, next) {
    try {
      return req.files ? next() : errorResponse(req,
        res, new ApiError({ status: 400, message: EMPTY_FILE }));
    } catch (error) {
      next(error);
    }
  }

}

export default ValidationMiddleware;
