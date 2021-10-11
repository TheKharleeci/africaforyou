/* eslint-disable max-lines */
import {
    helpers,
    genericErrors,
    DBError,
    ApiError,
    constants
  } from '../../utils';
  import config from '../../../config/env';
  import { UserService } from '../../services';
  
  const {
    GenericHelper: { errorResponse, moduleErrLogMessager },
    AuthHelper: { verifyToken, compareHash }
  } = helpers;
  const { SECRET, REFRESH_SECRET } = config;
  const { getUserByEmail } = UserService;
  const {
    RESOURCE_EXIST_VERIFICATION_FAIL
  } = constants;
  /**
   * A collection of middleware methods used to verify the authenticity
   * of requests through protected routes.
   *
   * @class AuthMiddleware
   */
  class AuthMiddleware {
  
    /**
     * Compares password from request and the one in the database.
     * @static
     * @param { Object } req - The request from the endpoint.
     * @param { Object } res - The response returned by the method.
     * @param { function } next - Calls the next handle.
     * @memberof AuthMiddleware
     * @returns {JSON} - Returns error response if validation fails or null.
     */
    static comparePassword(req, res, next) {
      const { user, body } = req;
      const isAuthenticUser = compareHash(
        body.password,
        user.password,
        user.salt
      );
      if (!isAuthenticUser) {
        return errorResponse(req, res, genericErrors.inValidLogin);
      }
      const { password, salt, ...otherInfo } = user;
      req.user = otherInfo;
      next();
    }
  
    /**
     * Verifies the validity of a user's access token or and the presence of it.
     * @static
     * @param { Object } req - The request from the endpoint.
     * @param { Object } res - The response returned by the method.
     * @param { function } next - Calls the next handle.
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof AuthMiddleware
     */
    static authenticate(req, res, next) {
      const token = AuthMiddleware.checkToken(req);
      if (!token) {
        return errorResponse(req, res, genericErrors.authRequired);
      }
      try {
        const decoded = req.body.refreshToken
          ? verifyToken(token, REFRESH_SECRET)
          : verifyToken(token, SECRET);
        req.data = decoded;
        next();
      } catch (err) {
        errorResponse(req, res, genericErrors.authRequired);
      }
    }
  
    /**
     * Checks that the user email provided during login exists.
     * @static
     * @param { Object } req - The request from the endpoint.
     * @param { Object } res - The response returned by the method.
     * @param { function } next - Calls the next handle.
     * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
     * @memberof AuthMiddleware
     */
    static async userEmailValidator(req, res, next) {
      try {
        req.user = await getUserByEmail(req.body.email.toLowerCase());
        next();
      } catch (e) {
        errorResponse(req, res, genericErrors.inValidLogin);
        const dbError = new DBError({
          status: RESOURCE_EXIST_VERIFICATION_FAIL('USER'),
          message: e.message
        });
        moduleErrLogMessager(dbError);
      }
    }

  }
  export default AuthMiddleware;
  