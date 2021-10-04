import rootPath from 'app-root-path';
import development from './development';
import test from './test';

const {
  PORT,
  AFRICAFORYOU_SECRET: SECRET,
  AFRICAFORYOU_REFRESH_SECRET: REFRESH_SECRET,
  AFRICAFORYOU_NODE_ENV: NODE_ENV
} = process.env;

const currentEnv = {
  development,
  test,
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  SECRET,
  REFRESH_SECRET,
  NODE_ENV
};
