import UserModel from '../../models';
import { helpers, constants, DBError } from '../../utils';
import config from '../../../config/env';


const {
  SIGNUP_SUCCESSFUL,
  RESOURCE_CREATE_ERROR_STATUS,
  VERIFICATION_SUCCESSFUL,
  VERIFICATION_FAIL,
  events: {
    SEND_CONFIRMATION_EMAIL }
} = constants;
const {
  AuthHelper: { hashString, generateToken },
  GenericHelper: { successResponse, moduleErrLogMessager },
  ErrorFactory: { resolveError },
} = helpers;

const { NODE_ENV, SECRET } = config;

/**
 * @class AuthController
 */
class AuthController {
  /**
   * adds new user
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof AuthController
   */
  static async createUser(req, res, next) {
    try {
      const { salt, hash } = hashString(req.body.password);
      const user = new UserModel({ ...req.body, password: hash, salt });
      await user.save();
      successResponse(res, {
        code: 201,
        message: SIGNUP_SUCCESSFUL
      });
    } catch (e) {
      const error = resolveError(e);
      const dbError = new DBError({
        status: RESOURCE_CREATE_ERROR_STATUS('USER'),
        message: e.message
      });
      moduleErrLogMessager(dbError);
      next(error);
    }
  }
}

export default AuthController;
