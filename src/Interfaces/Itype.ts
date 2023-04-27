import ICar from './ICar';
import IMotorcycle from './IMotorcycle';

interface IType {
  type: string | null
  message: string | ICar | IMotorcycle
}

export default IType;