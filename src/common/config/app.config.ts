import { ConfigModuleOptions } from '@nestjs/config';
import { configValidationSchema } from './validation.config';

export const configOptions: ConfigModuleOptions = {
  envFilePath: ['.env', '.development.env'],
  validationSchema: configValidationSchema,
  isGlobal: true,
  cache: true,
};
