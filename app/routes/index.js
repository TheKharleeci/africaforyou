import { Router } from 'express';

import welcomeRoutes from './welcome';
import authRoutes from './auth';

const router = Router();

router.use('/auth', authRoutes);


// const baseUrl = '/api/v1';
// const routes = app => {
//   app.use(`${baseUrl}`, welcomeRoutes);
// };

export default router;
