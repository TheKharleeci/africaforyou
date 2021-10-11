import { Router } from 'express';
import { ValidationMiddleware, AuthMiddleware } from '../middlewares';
import { signUpSchema, loginSchema } from '../validations';
import AuthController from '../controllers';

const router = Router();
const { validate } = ValidationMiddleware;
const { createUser, loginUser } = AuthController;
const { userEmailValidator, verificationValidator,
  comparePassword } = AuthMiddleware;

router.post(
  '/signup',
  validate(signUpSchema),
  createUser
);

router.post(
  '/login',
  validate(loginSchema),
  userEmailValidator,
  comparePassword,
  loginUser
);

export default router;
