import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';
import ICache from '@shared/core/ICache';

export default class Cache<K, T> implements ICache<K, T> {
  private static instance: unknown;

  private pool: Record<string, ArrayBuffer>;

  private constructor() {
    this.pool = {};
  }

  public getFromCache(key: K): T | null {
    try {
      const index = jwt.sign(JSON.stringify(key), authConfig.secret);
      return JSON.parse(Buffer.from(this.pool[index]).toString('utf8')) as T;
    } catch (err) {
      return null;
    }
  }
  public setInCache(key: K, value: T): void | null {
    try {
      const index = jwt.sign(JSON.stringify(key), authConfig.secret);
      const entry = JSON.stringify(value);
      this.pool[index] = Buffer.from(entry);
    } catch (err) {
      return null;
    }
  }

  static getInstance<K, T>(): Cache<K, T> {
    if (!Cache.instance) {
      Cache.instance = new Cache<K, T>();
    }
    return Cache.instance as Cache<K, T>;
  }
}
