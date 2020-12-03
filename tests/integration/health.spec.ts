import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

import App from '../../src/presentation/App';

describe('Health  - Endpoints', () => {
  const app = new App();

  before(async () => {
    chai.use(chaiHttp);
    await app.initApp();
  });

  describe('GET /', () => {
    it('Deve redirecionar para a rota /health e retornar 200 com a mensagem MS PRODUCTS RUNNING', async () => {
      const response = await chai.request(app.server).get('');

      assert.equal(response.status, 200);
      assert.equal(response.body, 'MS PRODUCTS RUNNING');
    });
  });

  describe('GET /health', () => {
    it('Deve retornar 200 com a mensagem MS PRODUCTS RUNNING', async () => {
      const response = await chai.request(app.server).get('/health');

      assert.equal(response.status, 200);
      assert.equal(response.body, 'MS PRODUCTS RUNNING');
    });
  });
});
