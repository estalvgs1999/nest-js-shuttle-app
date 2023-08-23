import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
  APP_URL: Joi.string().default('https://api.nosara.site'),
  JWT_AT_SECRET: Joi.string().required(),
  JWT_AT_EXP: Joi.string().default('3600s'),
  JWT_RT_SECRET: Joi.string().required(),
  JWT_RT_EXP: Joi.string().default('3600s'),
  MONGO_URI: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  AZURE_CONNECTION_STRING: Joi.string().required(),
});
