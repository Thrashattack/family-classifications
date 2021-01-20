export default interface ICachedService<T, K> {
  getFromCache(key: T): K | null;
  setInCache(key: T, value: K): void | null;
}
