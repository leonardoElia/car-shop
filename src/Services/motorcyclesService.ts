import { isValidObjectId } from 'mongoose';
import IMotorcycles from '../Interfaces/IMotorcycle';
import MotocyclesModel from '../Models/MotorcyclesModel';
import Motorcycle from '../Domains/Motorcycles';

class MotorcycleService {
  private motorcyclesModel: MotocyclesModel;

  constructor() {
    this.motorcyclesModel = new MotocyclesModel();
  }

  public async createMotorcycles(motorcycle: IMotorcycles): Promise<Motorcycle> {
    const newMotorcycles = await this.motorcyclesModel.create(motorcycle);
    return new Motorcycle(newMotorcycles);
  }

  public async listMotorcycles(): Promise<Motorcycle[]> {
    const motorcycles = await this.motorcyclesModel.list();
    const motorcyclesArray = motorcycles.map((motorcycle) => new Motorcycle(motorcycle));
    return motorcyclesArray;
  }

  public async listmotorcycle(id: string) {
    if (!isValidObjectId(id)) return { type: 'erro id', message: 'Invalid mongo id' };
    const motorcycle = await this.motorcyclesModel.vehicleId(id); 
    if (motorcycle) return { type: null, message: new Motorcycle(motorcycle) };
    return { type: 'Motorcycle does not exist', message: 'Motorcycle not found' };
  }

  public async updateMotorcycle(motocycles: IMotorcycles, id:string) {
    if (!isValidObjectId(id)) return { type: 'erro id', message: 'Invalid mongo id' };
    const motorcycleId = await this.motorcyclesModel.vehicleId(id);
    if (motorcycleId === null) {
      return { type: 'Motorcycle does not exist', message: 'Motorcycle not found' };
    } 
    const motorcycleUpdate = await this.motorcyclesModel.update(motocycles, id);
    return { type: null, message: new Motorcycle(motorcycleUpdate as IMotorcycles) };
  }
}

export default MotorcycleService;