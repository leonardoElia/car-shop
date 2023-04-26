import { Router } from 'express';
import MotorcyclesController from '../Controllers/motocyclesController';

const motorcyclesRoutes = Router();

motorcyclesRoutes.post(
  '/motorcycles',
  (req, res, next) => new MotorcyclesController(req, res, next).postMotorcycle(),
);

motorcyclesRoutes.get(
  '/motorcycles',
  (req, res, next) => new MotorcyclesController(req, res, next).getMotorcycle(),
);

motorcyclesRoutes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcyclesController(req, res, next).getMortocycleId(),
);

motorcyclesRoutes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotorcyclesController(req, res, next).putMotorcycles(),
);
export default motorcyclesRoutes;