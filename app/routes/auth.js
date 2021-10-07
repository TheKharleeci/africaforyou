import { Router } from 'express';
import ValidationMiddleware from '../middlewares';
import { signUpSchema } from '../validations';
import AuthController from '../controllers';

const router = Router();
const { validate } = ValidationMiddleware;
const { createUser } = AuthController;

router.post(
  '/signup',
  validate(signUpSchema),
  createUser
);


export default router;
