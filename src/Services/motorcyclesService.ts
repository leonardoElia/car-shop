import { isValidObjectId } from 'mongoose';
import IMotorcycles from '../Interfaces/IMotorcycle';
import MotocyclesModel from '../Models/MotorcyclesModel';
import Motorcycle from '../Domains/Motorcycle';

const erroId = 'erro id';
const invalidId = 'Invalid mongo id';
const motoNotExist = 'Motorcycle does not exist';
const motNotFound = 'Motorcycle not found';

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
    if (!isValidObjectId(id)) return { type: erroId, message: invalidId };
    const motorcycle = await this.motorcyclesModel.vehicleId(id); 
    if (motorcycle) return { type: null, message: new Motorcycle(motorcycle) };
    return { type: motoNotExist, message: motNotFound };
  }

  public async updateMotorcycle(motocycles: IMotorcycles, id:string) {
    if (!isValidObjectId(id)) return { type: erroId, message: invalidId };
    const motorcycleId = await this.motorcyclesModel.vehicleId(id);
    if (motorcycleId === null) {
      return { type: motoNotExist, message: motNotFound };
    } 
    const motorcycleUpdate = await this.motorcyclesModel.update(motocycles, id);
    return { type: null, message: new Motorcycle(motorcycleUpdate as IMotorcycles) };
  }

  public async deleteMotorcycle(id:string) {
    if (!isValidObjectId(id)) return { type: erroId, message: invalidId };
    const motorcycleId = await this.motorcyclesModel.vehicleId(id); 
    if (motorcycleId === null) return { type: motoNotExist, message: motNotFound };
    const deleteMotorcycle = await this.motorcyclesModel.delete(id);
    return { type: null, message: deleteMotorcycle };
  }
}

export default MotorcycleService;