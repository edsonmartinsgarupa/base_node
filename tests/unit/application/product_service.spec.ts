import { assert } from 'chai';
import { v4 as uuid, validate } from 'uuid';

import IProductService from '../../../src/domain/context/contracts/services/IProductService';
import ProductService from '../../../src/application/ProductService';
import ProductFactory from '../../../src/factories/ProductFactory';
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

  describe('Salvar um produto', () => {
    it('deve salvar um produto', async () => {
      const service: IProductService = new ProductService(new ProductRepositoryMock());
      const category = uuid();
      const data = ProductFactory.generateEntity(category, 'produto teste', 21.99)

      const product = await service.saveProduct(data);

      assert.equal(product.price, 21.99)
      assert.equal(product.category, category)
      assert.equal(product.name, 'produto teste')
      assert.isTrue(validate(product.uid))

    })

    it('não deve salvar um produto', async () => {
      const service: IProductService = new ProductService(new ProductRepositoryMock());
      const category = uuid();
      const data = ProductFactory.generateEntity(category, 'nao_salva', 21.99)

      const product = await service.saveProduct(data);

      assert.isNull(product)

    })
  })
});
