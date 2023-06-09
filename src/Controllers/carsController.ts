import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/carsService';

const erroId = 'erro id';
const carNotExist = 'car does not exist';

class CarsController { 
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private carService: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.carService = new CarService();
  }

  public async postCar() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
   
    const newCar = await this.carService.createCar(car);
    return this.res.status(201).json(newCar);
  }

  public async getCar() {
    const cars = await this.carService.listCars();
    return this.res.status(200).json(cars);
  }

  public async getCarId() {
    const { id } = this.req.params;
    const car = await this.carService.listCar(id);
    const { type, message } = car;
    if (type === carNotExist) return this.res.status(404).json({ message });
    if (type === erroId) return this.res.status(422).json({ message });
    return this.res.status(200).json(message);
  }

  public async putCar() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    const { id } = this.req.params;

    const carUpdate = await this.carService.updateCar(car, id);
    const { type, message } = carUpdate as any;
    if (type === carNotExist) return this.res.status(404).json({ message });
    if (type === erroId) return this.res.status(422).json({ message });
    return this.res.status(200).json(message);
  }

  public async deleteCar() {
    const { id } = this.req.params;
    const deleteCar = await this.carService.deleteCar(id);
    const { type, message } = deleteCar;
    if (type === carNotExist) return this.res.status(404).json({ message });
    if (type === erroId) return this.res.status(422).json({ message });
    return this.res.status(200).end();
  }
}

export default CarsController;