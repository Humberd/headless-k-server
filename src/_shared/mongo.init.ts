export function getMongoConnectionString() {
  const url = process.env.MONGO_URL;
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const database = process.env.MONGO_DATABASE;

  return `mongodb://${username}:${password}@${url}/${database}`;
}
