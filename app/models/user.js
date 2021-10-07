import db from '../db';
import queries from '../db/queries/user';
import { helpers } from '../utils';

const { saveUser } = queries;
const { GenericHelper: { generateId, convertCase } } = helpers;

/**
 * @class UserModel
 */
class UserModel {
  /**
   * This is a constructor for creating an instance of a User.
   * @param { Object } options - contains the required properties for creating
   * the user.
   * @returns { UserModel } - An instance of the user profile.
   * @constructor UserModel
   */
  constructor(options) {
    this.id = generateId();
    this.name = convertCase(options.name);
    this.email = convertCase(options.email);
    this.password = options.password;
    this.salt = options.salt;
    this.phone_number = options.phoneNumber;
  }

  /**
   * Persists a new user to the DB.
   * @memberof UserModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an user object or a DB Error.
   */
  async save() {
    return db.one(saveUser, [
      this.id,
      this.name,
      this.email,
      this.password,
      this.salt,
      this.phone_number,
    ]);
  }
}

export default UserModel;
