import Product from '../../entities/Product';

export default interface IProductRepository {
  getAll: () => Promise<Product[]>;
  deleteProducts: (category: string) => Promise<boolean>;
}
