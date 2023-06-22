import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000).required(),
  APP_URL: Joi.string().default('https://api.nosara.site'),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP: Joi.string().default('3600s'),
  URI_MONGODB: Joi.string().required(),
});
