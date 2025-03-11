export class CacheManager {
    private static instance: CacheManager;
    private cache: Map<string, { data: any; expiry: number }> = new Map();
  
    private constructor() {}
  
    public static getInstance(): CacheManager {
      if (!CacheManager.instance) {
        CacheManager.instance = new CacheManager();
      }
      return CacheManager.instance;
    }
  
    public get(key: string): any {
      const cached = this.cache.get(key);
      if (cached && cached.expiry > Date.now()) {
        return cached.data;
      }
      this.cache.delete(key);
      return null;
    }
  
    public set(key: string, data: any, ttl: number): void {
      const expiry = Date.now() + ttl;
      this.cache.set(key, { data, expiry });
    }
  }
  