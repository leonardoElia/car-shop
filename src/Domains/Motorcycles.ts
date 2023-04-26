import IMotocycles from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;
  
  constructor(motorcycle: IMotocycles) {
    super(motorcycle);
    this.id = motorcycle.id;
    this.model = motorcycle.model;
    this.year = motorcycle.year;
    this.color = motorcycle.color;
    this.buyValue = motorcycle.buyValue;
    this.status = motorcycle.status || false;
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}  

export default Motorcycle;
