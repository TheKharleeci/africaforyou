import sendGrid from '@sendgrid/mail';
import { constants, ModuleError } from '../../utils';
import config from '../../../config/env';
import { emailNotification } from './templates';

const { AFRICAFORYOU_EMAIL, NODE_ENV } = config;
const { EMAIL_WAS_NOT_SENT } = constants;

sendGrid.setApiKey(config.AFRICAFORYOU_SENDGRID_APIKEY);

/**
 * It contains methods for sending emails.
 *
 * @class Email
 */
class Email {
  /**
   * Sends emails through the mail client.
   * @static
   * @param {object} options - An object whose properties are used to configure the mail client.
   * @param {string} options.to - Recipient's email address.
   * @param {string} options.subject - The mail's subject.
   * @param {string} options.html - The message to be sent in html format.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static async send({ to, subject, html, from = 'AFRICAFORYOU' }) {
    const msg = {
      to,
      from: { email: AFRICAFORYOU_EMAIL, from },
      subject,
      html
    };
    try {
      return NODE_ENV === 'test' ? 'success' : await sendGrid.send(msg);
    } catch (error) {
      return new ModuleError({
        message: error.message,
        status: EMAIL_WAS_NOT_SENT
      });
    }
  }

  /**
   * Sends bulk emails through the mail client.
   * @static
   * @param {object} options - An object whose properties are used to configure the mail client.
   * @param {string} options.to - Recipient's email address.
   * @param {string} options.subject - The mail's subject.
   * @param {string} options.html - The message to be sent in html format.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static async sendMultiple({ to, subject, html, from = 'AFRICAFORYOU' }) {
    const msg = {
      to,
      from: { email: AFRICAFORYOU_EMAIL, from },
      subject,
      html
    };
    try {
      return new Promise((resolve, reject) => {
        sendGrid.sendMultiple(msg).then(() => {
          resolve('SENT');
        }).catch((e) => {
          reject(e);
        });
      });
    } catch (error) {
      return new ModuleError({
        message: error.message,
        status: EMAIL_WAS_NOT_SENT
      });
    }
  }

  /**
   * Sends a general mail to all registered users
   * @static
   * @param {object} options - Object whose properties are used to configure the confirmation mail.
   * @param {string} options.user - Recipients detail.
   * @param {string} options.subject - The subject of the mail.
   * @param {string} options.message - Body of the mail.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static async sendBulkEmail({ email, subject, message }) {
    const emailContent = emailNotification(subject, message);
    return Email.sendMultiple({ to: email, subject, html: emailContent });
  }

  /**
   * Sends a personal mail to a personalized users
   * @static
   * @param {object} options - Object whose properties are used to configure the confirmation mail.
   * @param {string} options.email - Recipient's email address.
   * @param {string} options.name - Recipient's name.
   * @param {string} options.subject - The subject of the mail.
   * @param {string} options.message - Body of the mail.
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static async sendSingleEmail({ email, name, subject, message }) {
    const emailContent = emailNotification(name, subject, message);
    return Email.send({ to: email, subject, html: emailContent });
  }
}
export default Email;
