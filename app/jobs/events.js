import EmailWorker from './workers/email';
import { constants } from '../utils';

const { events: { SEND_CONFIRMATION_EMAIL,
  SEND_PASSWORD_RESET_CONFIRMATION, SEND_PASSWORD_RESET_LINK,
  SEND_BULK_EMAIL_NOTIFICATION, SEND_SINGLE_EMAIL_NOTIFICATION,} } = constants;

export default (queue) => {
  queue.process(SEND_CONFIRMATION_EMAIL, EmailWorker.sendConfirmationEmail);
  queue.process(SEND_PASSWORD_RESET_CONFIRMATION, EmailWorker.sendPasswordConfirmationEmail);
  queue.process(SEND_PASSWORD_RESET_LINK, EmailWorker.sendResetPasswordLink);
  queue.process(SEND_BULK_EMAIL_NOTIFICATION, EmailWorker.sendBulkMail);
  queue.process(SEND_SINGLE_EMAIL_NOTIFICATION, EmailWorker.sendSingleMail);
};
