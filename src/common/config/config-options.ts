import { ConfigModuleOptions } from '@nestjs/config';
import { configSchema } from './config-schema';
import { configLoader } from './config-loader';

export const configOptions: ConfigModuleOptions = {
  envFilePath: ['.env', '.development.env'],
  load: [configLoader],
  validationSchema: configSchema,
  isGlobal: true,
  cache: true,
};
