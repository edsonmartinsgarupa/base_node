import { assert } from 'chai';
import { v4 as uuid } from 'uuid';

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

  describe('Deletar todos os products de X category', () => {
    context('Quando deleta todos os products sem erro', () => {
      it('Então deve retornar a mensagem PRODUCTS DELETED', async () => {
        const service: IProductService = new ProductService(
          new ProductRepositoryMock()
        );
        const category = 'deleted_products';

        const message = await service.deleteProducts(category);

        assert.equal(message, 'products deleted');
      });
    });

    context('Quando não deleta todos os products', () => {
      it('Então deve retornar a mensagem PRODUCTS DELETED', async () => {
        const service: IProductService = new ProductService(
          new ProductRepositoryMock()
        );
        const category = 'not_deleted_products';

        const message = await service.deleteProducts(category);

        assert.equal(message, 'products not deleted');
      });
    });
  });
});
