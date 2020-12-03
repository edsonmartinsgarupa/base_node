import { assert } from 'chai';
import ApplicationError from '../../../../../src/domain/shared/object_values/ApplicationError';

describe('Domain > Shared > ApplicationError', () => {
  context('Quando cria o erro', () => {
    it('Então deve retornar uma instância do ApplicationError', () => {
      const error = new ApplicationError(
        'Tests > Unit',
        'TESTE_ERROR',
        500,
        []
      );

      assert.instanceOf(error, ApplicationError);
      assert.equal(error.code, 500);
      assert.equal(error.process, 'Tests > Unit');
      assert.equal(error.message, 'TESTE_ERROR');
      assert.isArray(error.detail);
      assert.isEmpty(error.detail);
    });
  });
});
