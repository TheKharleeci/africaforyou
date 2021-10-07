/* istanbul ignore file */
import { EmailService } from '../../services';

const {
  sendVerificationEmail,
  sendPasswordEmail,
  passwordResetConfirmationEmail,
  forgotPassword,
  sendBulkEmail,
  sendSingleEmail,
  sendSchoolEnquiry,
  loanManagerPasswordEmail
} = EmailService;

/**
 * A collection of worker methods that handles event related to emails.
 *
 * @class EmailWorker
 */
class EmailWorker {
  /**
   * Handles the confirmation email to be sent when a user signs up
   * @static
   * @memberof EmailWorker
   * @param { Object } data - The job object containing details of the email to be sent.
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendConfirmationEmail({ data }, done) {
    try {
      await sendVerificationEmail(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever a reset password is initiated.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendPasswordConfirmationEmail({ data }, done) {
    try {
      await passwordResetConfirmationEmail(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever forgot password is initiated.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a .
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendResetPasswordLink({ data }, done) {
    try {
      await forgotPassword(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the general notification email to be sent to all users
   * @static
   * @memberof EmailWorker
   * @param { Object } data - The job object containing details of the email to be sent.
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendBulkMail({ data }, done) {
    try {
      await sendBulkEmail(data);
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles email to be sent to a single user
   * @static
   * @memberof EmailWorker
   * @param { Object } data - The job object containing details of the email to be sent.
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async sendSingleMail({ data }, done) {
    try {
      await sendSingleEmail(data);
      done();
    } catch (error) {
      done(error);
    }
  }
}

export default EmailWorker;
