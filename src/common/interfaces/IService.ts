export default interface IService<T> {
  execute(...args: unknown[]): Promise<T>
}