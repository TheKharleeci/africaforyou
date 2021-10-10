import { helpers, constants } from '../../utils';
import cloudinaryConfig from '../../utils/helpers/upload';

const {
  GenericHelper: { moduleErrLogMessager },
  ErrorFactory: { resolveError }
} = helpers;
const {
  UPLOAD_FAIL_STATUS,
} = constants;

/**
 * A collection of middleware methods used to validate requests
 * @class UploadMiddleware
 */
class UploadMiddleware {
  /**
   * @static
   * @param {request} req - request made through the endpoint
   * @param {response} res - response gotten from the API
   * @param {function} next - The function that calls the next handler
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UploadMiddleware
   */
  static async uploadImage(req, res, next) {
    try {
        const { file, body } = req;
        if (file) {
          const uploadFile = await cloudinaryConfig(req);
          body.image_url = uploadFile.secure_url;
          return next();
        }
    } catch (e) {
      moduleErrLogMessager(e, UPLOAD_FAIL_STATUS);
      next(resolveError(e));
    }
  }

    /**
   * @static
   * @param {request} req - request made through the endpoint
   * @param {response} res - response gotten from the API
   * @param {function} next - The function that calls the next handler
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UploadMiddleware
   */
  static async uploadVideo(req, res, next) {
    try {
        const { file, body } = req;
          if (file) {
            const uploadFile = await cloudinaryConfig(req);
            body.video_url = uploadFile.secure_url;         
            return next();
          }
    }catch (e) {
        moduleErrLogMessager(e, UPLOAD_FAIL_STATUS);
        next(resolveError(e));
    }
  }
}

export default UploadMiddleware;
