export const config = {
  DB: `mongodb://${process.env.DB_HOST || "localhost"}:${
    process.env.DB_PORT
  }/auth`
};
