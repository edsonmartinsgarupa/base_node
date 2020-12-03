import { Connection, createConnection } from 'typeorm';
import IConnection from '../contracts/IConnection';

export default class Database implements IConnection<Connection> {
  private static connection: Connection;

  public getConnection(): Connection {
    if (Database.connection === null || Database.connection === undefined) {
      throw new Error('CONEXAO_DATABASE_NAO_ABERTA');
    }

    return Database.connection;
  }

  public async openConnection(): Promise<void> {
    if (Database.connection === null || Database.connection === undefined) {
      try {
        Database.connection = await createConnection();
      } catch (error) {
        console.error('FATAL ERRO DATABASE -> ', error);
      }
    }
  }
}
