export default interface IConnection<T> {
  getConnection: () => T;
  openConnection: () => Promise<void>;
}
