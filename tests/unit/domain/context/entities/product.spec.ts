import { assert } from 'chai';
import { v4 as uuid } from 'uuid';

import Product from '../../../../../src/domain/context/entities/Product';
import ProductFacotry from '../../../../../src/factories/ProductFactory';

describe('Domain > Entities > Product', () => {
  context('Quando cria o product informando um UID', () => {
    it('Então deve retornar uma instância do product com o uid igual ao informado', () => {
      const uid = uuid();
      const product = ProductFacotry.generateEntity(
        uuid(),
        'Tenis',
        25.55,
        uid
      );

      assert.instanceOf(product, Product);
      assert.equal(product.uid, uid);
      assert.equal(product.name, 'Tenis');
      assert.equal(product.price, 25.55);
      assert.isDefined(product.category);
      assert.isString(product.category);
    });
  });

  context('Quando cria o product não informando um UID', () => {
    it('Então deve retornar uma instância do product', () => {
      const product = ProductFacotry.generateEntity(uuid(), 'Tenis', 25.55);
      assert.instanceOf(product, Product);
      assert.isNotNull(product.uid);
      assert.isDefined(product.uid);
      assert.isString(product.uid);
      assert.equal(product.name, 'Tenis');
      assert.equal(product.price, 25.55);
      assert.isDefined(product.category);
      assert.isString(product.category);
    });
  });
});
