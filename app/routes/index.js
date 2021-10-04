import welcomeRoutes from './welcome';

const baseUrl = '/api/v1';
const routes = app => {
  app.use(`${baseUrl}`, welcomeRoutes);
};

export default routes;
