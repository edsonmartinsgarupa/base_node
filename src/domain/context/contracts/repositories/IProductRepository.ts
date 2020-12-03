import Product from '../../entities/Product';

export default interface IProductRepository {
  getAll: () => Promise<Product[]>;
}
