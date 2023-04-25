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
}

export default CarService;