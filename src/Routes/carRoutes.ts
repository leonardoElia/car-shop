import { Router } from 'express';
import CarsController from '../Controllers/carsController';

const carRoutes = Router();

carRoutes.post(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).postCar(),
);

export default carRoutes;