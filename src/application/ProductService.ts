import IProductRepository from '../domain/context/contracts/repositories/IProductRepository';
import IProductService from '../domain/context/contracts/services/IProductService';
import Product from '../domain/context/entities/Product';

export default class ProductService implements IProductService {
  #repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.#repository = repository;
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.#repository.getAll();

    return products;
  }
}
