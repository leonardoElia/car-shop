import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';

import ICar from '../Interfaces/ICar';

class CarsModel {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async list(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async cardId(id: string): Promise<ICar | null> {
    return this.model.findById(id);
  }

  public async update(car: ICar, id:string): Promise<ICar | null> {
    return this.model.findOneAndUpdate({ _id: id }, { ...car }, { new: true });
  }
}

export default CarsModel;