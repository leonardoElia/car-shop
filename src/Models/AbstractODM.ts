import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
  
class AbstractODM<T> {
  private schema: Schema;
  private model: Model<T>;
  private modelName: string;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }
  
  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }
  
  public async list(): Promise<T[]> {
    return this.model.find({});
  }
  
  public async vehicleId(id: string): Promise<T | null> {
    return this.model.findById(id);
  }
  
  public async update(vehicle: Partial<T>, id:string): Promise<T | null> {
    return this.model.findOneAndUpdate({ _id: id }, { ...vehicle }, { new: true });
  }

  public async delete(id:string): Promise<T | null> {
    return this.model.findOneAndDelete({ _id: id });
  }
}
  
export default AbstractODM;