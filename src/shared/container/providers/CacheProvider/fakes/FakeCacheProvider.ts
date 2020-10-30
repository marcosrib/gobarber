import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}
export default class FakeCacheProvider implements ICacheProvider {
  private chache: ICacheData = {};

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.chache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.chache[key];
    });
  }

  public async save(key: string, value: any): Promise<void> {
    this.chache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.chache[key];

    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.chache[key];
  }
}
