import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../src/Interfaces/ICar';
import CarService from '../../src/Services/carsService';
// import Car from '../../src/Domains/Car';

// tests/unit/services/transfer.test.ts

describe('testes da rotas de cars', function () {
  afterEach(function () {
    sinon.restore();
  });  
  it('testando se carro é cadastrado com sucesso', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carOutput: ICar = {
      id: '64495b8cbeb22eb6b3dc4236',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      buyValue: 15.99,
      status: true,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.createCar(carInput);
    
    expect(result).to.be.deep.equal(carOutput);
  });
  it('testando se lista os carros com sucesso', async function () {
    const carsList = [
      {
        id: '64495b8cbeb22eb6b3dc4236',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        buyValue: 15.99,
        status: true,
        doorsQty: 4,
        seatsQty: 5,
      },
    ];
    sinon.stub(Model, 'find').resolves(carsList);

    const service = new CarService();
    const result = await service.listCars();
    
    expect(result).to.be.deep.equal(carsList);
  });

  it('testando se lista carro busxando por id em caso de sucesso', async function () {
    const car = {
      id: '64495b8cbeb22eb6b3dc4236',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      buyValue: 15.99,
      status: true,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findById').resolves(car);

    const service = new CarService();
    const result = await service.listCar('64495b8cbeb22eb6b3dc4236');
    
    expect(result).to.be.deep.equal({ type: null, message: car });
  });

  it('testando se exibe a mesagem correta caso id não existir', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const result = await service.listCar('64495b8cbeb22eb6b3dc4236');
    
    expect(result).to.be.deep.equal({ type: 'car does not exist', message: 'Car not found' });
  });

  it('testando em caso de id não ter o formato correto', async function () {
    const service = new CarService();
    const result = await service.listCar('jdldfjldkj');
    
    expect(result).to.be.deep.equal({ type: 'erro id', message: 'Invalid mongo id' });
  });
});