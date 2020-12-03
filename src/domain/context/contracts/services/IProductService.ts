import Product from '../../entities/Product';

export default interface IProductService {
  getAll: () => Promise<Product[]>;
}
