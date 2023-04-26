import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/motorcyclesService';
// import Car from '../../src/Domains/Car';
const textoMessage = 'Invalid mongo id';
// tests/unit/services/transfer.test.ts

const modelMoto = 'Honda Cb 600f Hornet';

describe('testes da rotas de motorcycles', function () {
  afterEach(function () {
    sinon.restore();
  });  
  it('testando se moto é cadastrada com sucesso', async function () {
    const motorcycleInput: IMotorcycle = {
      model: modelMoto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleOutput: IMotorcycle = {
      id: '64495b8cbeb22eb6b3dc4236',
      model: modelMoto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.createMotorcycles(motorcycleInput);
    
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('testando se lista as motos com sucesso', async function () {
    const motorcyclesList = [
      {
        id: '64495b8cbeb22eb6b3dc4236',
        model: modelMoto,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    ];
    sinon.stub(Model, 'find').resolves(motorcyclesList);

    const service = new MotorcycleService();
    const result = await service.listMotorcycles();
    
    expect(result).to.be.deep.equal(motorcyclesList);
  });

  it('testando se lista moto buscando por id em caso de sucesso', async function () {
    const motorcycle = {
      id: '64495b8cbeb22eb6b3dc4236',
      model: modelMoto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findById').resolves(motorcycle);

    const service = new MotorcycleService();
    const result = await service.listmotorcycle('64495b8cbeb22eb6b3dc4236');
    
    expect(result).to.be.deep.equal({ type: null, message: motorcycle });
  });

  it('testando se exibe a mesagem correta caso id não existir ao buscar moto', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new MotorcycleService();
    const result = await service.listmotorcycle('64495b8cbeb22eb6b3dc4236');
    
    expect(result).to.be.deep.equal({
      type: 'Motorcycle does not exist',
      message: 'Motorcycle not found' });
  });

  it('testando em caso de id não ter o formato correto ao buscar moto', async function () {
    const service = new MotorcycleService();
    const result = await service.listmotorcycle('jdldfjldkj');
    
    expect(result).to.be.deep.equal({ type: 'erro id', message: textoMessage });
  });

  it('testando em caso de id não ter o formato correto ao atualizar', async function () {
    const carInput: IMotorcycle = {
      model: modelMoto,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const service = new MotorcycleService();
    const result = await service.updateMotorcycle(carInput, 'jdldfjldkj');
    
    expect(result).to.be.deep.equal({ type: 'erro id', message: textoMessage });
  });
});