export const configLoader = () => {
  return {
    port: process.env.PORT,
    mongo: {
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      url: process.env.MONGO_URI,
    },
  };
};
