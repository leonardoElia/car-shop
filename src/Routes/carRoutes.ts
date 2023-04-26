import { Router } from 'express';
import CarsController from '../Controllers/carsController';

const carRoutes = Router();

carRoutes.post(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).postCar(),
);

carRoutes.get(
  '/cars',
  (req, res, next) => new CarsController(req, res, next).getCar(),
);

carRoutes.get(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).getCarId(),
);

carRoutes.put(
  '/cars/:id',
  (req, res, next) => new CarsController(req, res, next).putCar(),
);
export default carRoutes;