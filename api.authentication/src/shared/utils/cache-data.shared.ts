import { Cache } from 'cache-manager';

export class CacheData {
  static async logAllCachedData(cacheManager: Cache) {
    const cacheKeys = await cacheManager.store.keys();

    const cacheData = await Promise.all(
      cacheKeys.map((key: string) => cacheManager.get(key)),
    );

    console.log('cacheData: ', cacheData);
  }
}
