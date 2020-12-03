import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import Routes from './routes/Routes';
import Database from '../infra/connections/Database';

export default class App {
  readonly #express: express.Application;

  public get server(): express.Application {
    return this.#express;
  }

  constructor() {
    this.#express = express();
  }

  public async initApp(): Promise<App> {
    this.middlewares();
    this.routes();
    await this.database();
    return this;
  }

  public async database(): Promise<void> {
    await new Database().openConnection();
  }

  public middlewares(): void {
    this.#express.use(express.json());
    this.#express.use(cors());
    this.#express.use(helmet());
  }

  public routes(): void {
    const routes = new Routes().initRoutes();
    this.#express.use(routes);
  }

  public startServer(port: number): void {
    this.#express.listen(port, () =>
      console.log(`Server is running on ${port}`)
    );
  }
}
