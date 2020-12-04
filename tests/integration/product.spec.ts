import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { v4 as uuid } from 'uuid';

import ProductEntity from '../../src/infra/database/entities/ProductEntity';
import App from '../../src/presentation/App';

describe('Products  - Endpoints', () => {
  const app = new App();

  before(async () => {
    chai.use(chaiHttp);
    chai.should();
    await app.initApp();
  });

  describe('ANY /products', () => {
    it('deve retornar codigo 401 token nao enviado', async () => {
      const response = await chai.request(app.server).get('/products');

      assert.equal(response.status, 401);
      assert.isFalse(response.body.success);
      assert.equal(response.body.error.message, 'TOKEN_NAO_ENVIADO');
    });

    it('deve retornar codigo 401 não autenticado', async () => {
      const response = await chai
        .request(app.server)
        .post('/products/qualquer_rota')
        .set('authorization', 'teste');

      assert.equal(response.status, 401);
      assert.isFalse(response.body.success);
      assert.equal(response.body.error.message, 'TOKEN_INVALIDO');
    });
  })

  describe('GET /products', () => {
    beforeEach(async () => {
      await ProductEntity.clear();
    });

    it('deve retornar uma lista de products', async () => {
      await ProductEntity.create({
        uid: uuid(),
        category: uuid(),
        name: 'Tenis I',
        price: 25.55,
      }).save();

      await ProductEntity.create({
        uid: uuid(),
        category: uuid(),
        name: 'Tenis II',
        price: 25.55,
      }).save();

      const response = await chai
        .request(app.server)
        .get('/products')
        .set('Authorization', 'Bearer TOKEN_CRIPTOGRAFADO');

      assert.equal(response.status, 200);
      assert.isTrue(response.body.success);
      assert.isArray(response.body.data);
      assert.lengthOf(response.body.data, 2);
    });

    it('deve retornar codigo 404 nenhum produtc encontrado', async () => {
      const response = await chai
        .request(app.server)
        .get('/products')
        .set('Authorization', 'Bearer TOKEN_CRIPTOGRAFADO');

      assert.equal(response.status, 404);
      assert.isFalse(response.body.success);
      assert.equal(response.body.error.message, 'NENHUM_PRODUTO_CADASTRADO');
    });
  });

  describe('DELETE /products/:category', () => {
    beforeEach(async () => {
      await ProductEntity.clear();
    })

    it('deve retornar um valor true', async () => {
      const category = uuid()

      await ProductEntity.create({
        uid: uuid(),
        category: category,
        name: 'Tenis I',
        price: 25.55,
      }).save();

      await ProductEntity.create({
        uid: uuid(),
        category: category,
        name: 'Tenis II',
        price: 25.55,
      }).save();

      await ProductEntity.create({
        uid: uuid(),
        category: uuid(),
        name: 'Tenis III',
        price: 25.55,
      }).save();

      const response = await chai
        .request(app.server)
        .delete(`/products/${category}`)
        .set('Authorization', 'Bearer TOKEN_CRIPTOGRAFADO');

      assert.equal(response.status, 200);
      assert.isTrue(response.body.success);
      assert.equal(response.body.data, 'products deleted');

      const products = await ProductEntity.find();

      assert.lengthOf(products, 1, 'precisa ter somente 1 product na base de dados')
    })
  })
});
