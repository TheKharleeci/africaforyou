import db from '../../db';
import queries from '../../db/queries/user';

const { fetchUserById, updatePassword, findUserByEmail,
  updateUserResetPin, updateUserVerificationStatus, updateUserProfileById,
  fetchAllUserEmailAndName, fetchIfUserExists } = queries;

/**
 * Contains a collection of service methods for managing User resource on the app.
 * @class UserService
 *
 */
class UserService {
  /**
   * Fetches a User by id
   * @memberof UserService
   * @param {uuid} id - user id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async getUserById(id) {
    return db.one(fetchUserById, [id]);
  }

  /**
   * Fetches a User by email
   * @memberof UserService
   * @param email - user email
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async getUserByEmail(email) {
    return db.one(findUserByEmail, [email]);
  }

  /**
   * Update user password
   * @memberof UserService
   * @param {string} id - id of User
   * @param {object} newPassword - Hash and salt generated from the password string
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async updateUserPassword(hash, salt, id) {
    return db.one(updatePassword, [hash, salt, id]);
  }

  /**
   * Update User reset pin
   * @memberof UserService
   * @param {string} pin - randomly generated pin
   * @param {object} id - id of User
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async updateUserResetPin(pin, id) {
    return db.one(updateUserResetPin, [pin, id]);
  }

  /**
   * Updates a user verification status
   * @memberof UserService
   * @param {string} userId - The id of the user
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the user resource or a DB Error.
   */
  static async updateUserStatus(userId) {
    return db.one(updateUserVerificationStatus, [userId]);
  }

  /**
   * Updates a user profile
   * @memberof UserService
   * @param {string} id - The id of the user
   * @param {string} userObj- user object
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Array of the user resource or a DB Error.
   */
  static async updateUserProfile(id, userObj) {
    const user = UserService.getUserById(id);
    const { firstName, lastName, phoneNumber } = { ...user, ...userObj };
    return db.one(updateUserProfileById, [id, firstName, lastName, phoneNumber]);
  }

  /**
   * Fetches User's details
   * @memberof UserService
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Array of the user resource or a DB Error.
   */
  static async fetchAllUsers() {
    return db.any(fetchAllUserEmailAndName);
  }

  /**
   * Fetches User's details
   * @memberof UserService
   * @param {object} obj - The obj to determine if user exists
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Array of the user resource or a DB Error.
   */
  static async checkIfUserUnique(obj) {
    return db.oneOrNone(fetchIfUserExists, obj);
  }
}

export default UserService;
