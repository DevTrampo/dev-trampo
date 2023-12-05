// import restaurantRouter from '@modules/restaurant/presentation/routes/restaurant.routes';
import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world' });
});

// routes.use('/restaurant', restaurantRouter);
// routes.use('/dish', dishRouter);
// routes.use('/tag', tagRouter);

export default routes;
