export const configLoader = () => {
  return {
    port: process.env.PORT,
    mongo: {
      database: process.env.DB_NAME,
      url: process.env.MONGO_URI,
    },
    apiKey: process.env.API_KEY,
  };
};
