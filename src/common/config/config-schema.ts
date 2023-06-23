import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
  APP_URL: Joi.string().default('https://api.nosara.site'),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP: Joi.string().default('3600s'),
  MONGO_URI: Joi.string().required(),
  MONGO_USERNAME: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
});
