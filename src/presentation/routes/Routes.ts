import express, { Router } from 'express';
import ProductController from '../controllers/ProductController';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

export default class Routes {
  readonly #routes: express.Router;

  constructor() {
    this.#routes = Router();
  }

  initRoutes(): express.Router {
    this.#routes.get('/', (_, response) => response.redirect('/health'));
    this.#routes.get('/health', (_, response) =>
      response.json('MS PRODUCTS RUNNING')
    );
    this.#routes.use(authenticationMiddleware);
    this.#routes.use('/products', this.mainRoutes());
    return this.#routes;
  }

  mainRoutes(): Router {
    const productsRoutes = Router();
    const controller = new ProductController();

    productsRoutes.get('/', controller.getAll);
    productsRoutes.delete('/:category', controller.deleteProducts);
    productsRoutes.post('/', controller.saveProduct);

    return productsRoutes;
  }
}
