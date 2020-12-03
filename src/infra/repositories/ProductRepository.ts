import { Connection, EntityManager } from 'typeorm';
import ProductMapper from '../../data_mappers/ProductMapper';

import IProductRepository from '../../domain/context/contracts/repositories/IProductRepository';
import Product from '../../domain/context/entities/Product';
import IConnection from '../contracts/IConnection';
import ProductEntity from '../database/entities/ProductEntity';

export default class ProductRepository implements IProductRepository {
  readonly #instanceDB: EntityManager;

  constructor(conexao: IConnection<Connection>) {
    this.#instanceDB = conexao.getConnection().manager;
  }

  public async getAll(): Promise<Product[]> {
    const productEntities = await this.#instanceDB.find(ProductEntity);

    if (!productEntities || productEntities.length === 0) return [];

    const products = productEntities.map((entity) =>
      ProductMapper.fromRepositorieToDomain(entity)
    );

    return products;
  }
}
