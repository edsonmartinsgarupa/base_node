import { v4 as uuid } from 'uuid';

import IProductRepository from '../../../src/domain/context/contracts/repositories/IProductRepository';
import Product from '../../../src/domain/context/entities/Product';
import ProductFactory from '../../../src/factories/ProductFactory';

export default class ProductRepositoryMock implements IProductRepository {
  async getAll(): Promise<Product[]> {
    return [
      ProductFactory.generateEntity(uuid(), 'Teste 1', 10.0, uuid()),
      ProductFactory.generateEntity(uuid(), 'Teste 2', 15.0, uuid()),
    ];
  }
}