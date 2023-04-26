import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarsModel from '../Models/CarsModel';
import Car from '../Domains/Car';

class CarService {
  private carModel: CarsModel;

  constructor() {
    this.carModel = new CarsModel();
  }

  public async createCar(car: ICar): Promise<Car> {
    const newCar = await this.carModel.create(car);
    return new Car(newCar);
  }

  public async listCars(): Promise<Car[]> {
    const cars = await this.carModel.list();
    const carsArray = cars.map((car) => new Car(car));
    return carsArray;
  }

  public async listCar(id: string) {
    if (!isValidObjectId(id)) return { type: 'erro id', message: 'Invalid mongo id' };
    const car = await this.carModel.vehicleId(id); 
    if (car) return { type: null, message: new Car(car) };
    return { type: 'car does not exist', message: 'Car not found' };
  }

  public async updateCar(car: ICar, id:string) {
    if (!isValidObjectId(id)) return { type: 'erro id', message: 'Invalid mongo id' };
    const carId = await this.carModel.vehicleId(id); 
    if (carId === null) return { type: 'car does not exist', message: 'Car not found' };
    const carUpdate = await this.carModel.update(car, id);
    return { type: null, message: new Car(carUpdate as ICar) };
  }
}

export default CarService;