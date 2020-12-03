import App from './presentation/App';

const iniciar = async (): Promise<void> => {
  const app = new App();
  const port = Number(process.env.PORT);
  await app.initApp();
  app.startServer(Number.isNaN(port) ? 3000 : port);
};

iniciar().catch((err) => console.log(err));
