import Redis from 'ioredis';
import config from '../../../config/env';

const { NODE_ENV, REDIS_URL } = config;

// Creates an instance of a Redis client.
const redisDB = REDIS_URL
  ? new Redis(REDIS_URL)
  : new Redis({ showFriendlyErrorStack: true });

// Selects a different database while in the testing environment
if (NODE_ENV === 'test') {
  const index = REDIS_URL ? 0 : 3;
  redisDB.select(index, async (err) => {
    if (err) {
      logger.error(`An Error occurred while spawning a 
      new Redis database with the following message: ${err.message}`);
      process.exit(1);
    } else {
      try {
        await redisDB.flushdb();
        logger.info('Redis database flushed');
      } catch (e) {
        logger.error(
          `An Error occurred while removing test keys with the message: ${e.message}`
        );
      }
    }
  });
}

export default redisDB;
