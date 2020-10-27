import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';
import RedisChacheProvider from './implementations/RedisChacheProvider';

const providers = {
  redis: RedisChacheProvider,
};

container.registerSingleton<ICacheProvider>('ChacheProvider', providers.redis);
