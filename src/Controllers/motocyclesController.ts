import { NextFunction, Request, Response } from 'express';
import IMotorcycles from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/motorcyclesService';

class MotorcyclesController { 
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private motorcycleService: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.motorcycleService = new MotorcycleService();
  }

  public async postMotorcycle() {
    const motorcycle: IMotorcycles = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
   
    const newMotorcycle = await this.motorcycleService.createMotorcycles(motorcycle);
    return this.res.status(201).json(newMotorcycle);
  }

  public async getMotorcycle() {
    const motorcycles = await this.motorcycleService.listMotorcycles();
    return this.res.status(200).json(motorcycles);
  }

  public async getMortocycleId() {
    const { id } = this.req.params;
    const motorcycle = await this.motorcycleService.listmotorcycle(id);
    const { type, message } = motorcycle;
    if (type === 'Motorcycle does not exist') return this.res.status(404).json({ message });
    if (type === 'erro id') return this.res.status(422).json({ message });
    return this.res.status(200).json(message);
  }

  public async putMotorcycles() {
    const motorcycle: IMotorcycles = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    const { id } = this.req.params;

    const motorcycleUpdate = await this.motorcycleService.updateMotorcycle(motorcycle, id);
    const { type, message } = motorcycleUpdate as any;
    if (type === 'Motorcycle does not exist') return this.res.status(404).json({ message });
    if (type === 'erro id') return this.res.status(422).json({ message });
    return this.res.status(200).json(message);
  }
}

export default MotorcyclesController;