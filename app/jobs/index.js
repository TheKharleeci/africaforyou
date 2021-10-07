/* istanbul ignore file */
import Redis from 'ioredis';
import Queue from 'bull';
import jobEvents from './events';
import config from '../../config/env';

// eslint-disable-next-line max-lines-per-function
const startQueue = () => {
  let q;
  if (config.REDIS_URL) {
    const client = new Redis(config.REDIS_URL);
    const subscriber = new Redis(config.REDIS_URL);

    const opts = {
      createClient(type, redisOpts) {
        switch (type) {
          case 'client':
            return client;
          case 'subscriber':
            return subscriber;
          case 'bclient':
            return new Redis(config.REDIS_URL, redisOpts);
          default:
            throw new Error('Unexpected connection type: ', type);
        }
      }
    };
    q = new Queue('AfricaforyouProd', opts);
  } else {
    q = new Queue('Africaforyou', 'redis://127.0.0.1:6379');
  }
  return q;
};

export const queue = startQueue();

queue.setMaxListeners(queue.getMaxListeners() + 100);

jobEvents(queue);

export const createJob = (options) => {
  const opts = { priority: 0, attempts: 5, ...options };
  queue.add(opts.type, opts.data, {
    attempts: opts.attempts,
    backoff: {
      type: 'exponential',
      delay: 60000
    },
    removeOnComplete: true,
    removeOnFail: true
  });
};

// Queue Events

// Fires when a job is added to queue
queue.on('active', ({ id, name }) => {
  logger.info(`The job ${id} of name: ${name} got added to queue`);
});

// Fires when a job is done with.
queue.on('completed', ({ id }) => {
  logger.info(`Job with the id: ${id} just completed`);
});

// Fires when a job fails after a certain retry.
queue.on('failed', ({ id, attemptsMade }, err) => {
  if (logger) {
    logger.info(
      `Job of id: ${id} failed with the message: ${err.message} after ${attemptsMade} attempts`
    );
  }
});
