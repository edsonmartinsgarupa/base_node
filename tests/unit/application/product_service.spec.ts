import { assert } from 'chai';

import IProductService from '../../../src/domain/context/contracts/services/IProductService';
import ProductService from '../../../src/application/ProductService';
import ProductRepositoryMock from '../mocks/ProductRepositoryMock';

describe('Application > ProductService', () => {
  describe('Retornar todos os products', () => {
    context('Quando retorna todos os products sem erro', () => {
      it('Então deve retornar uma lista de products', async () => {
        const service: IProductService = new ProductService(
          new ProductRepositoryMock()
        );

        const products = await service.getAll();

        assert.isArray(products);
        assert.lengthOf(products, 2);
      });
    });
  });
});
