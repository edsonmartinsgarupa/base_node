import { v4 as uuid } from 'uuid';

import ProductService from '../application/ProductService';
import IProductService from '../domain/context/contracts/services/IProductService';
import Product from '../domain/context/entities/Product';
import Database from '../infra/connections/Database';
import ProductRepository from '../infra/repositories/ProductRepository';

export default class ProductFactory {
  public static generateService(): IProductService {
    const productRepository = new ProductRepository(new Database());

    const productService = new ProductService(productRepository);

    return productService;
  }

  public static generateEntity(
    category: string,
    name: string,
    price: number,
    uid?: string
  ): Product {
    const product = Product.create(uid ?? uuid(), category, name, price);

    return product;
  }
}
