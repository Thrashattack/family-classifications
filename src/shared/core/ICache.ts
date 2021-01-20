export default interface ICache<K, T> {
  getFromCache(key: K): T | null;
  setInCache(key: K, value: T): void | null;
}
