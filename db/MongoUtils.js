const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017,
    dbName = "some-mongo",
    user = process.env.MONGO_USER,
    pwd = process.env.MONGO_PWD;

  mu.connect = () => {
    const client = new MongoClient(
      `mongodb://${user}:${pwd}@${hostname}:${port}`,
      {
        useUnifiedTopology: true
      }
    );
    return client.connect();
  };

  mu.mongo = {};

  mu.mongo.database = () =>
    mu.connect().then(client => {
      return client
        .db(dbName)
        .listCollections()
        .toArray()
        .finally(() => client.close());
    });

  mu.mongo.collection = collection =>
    mu.connect().then(client => {
      const dataCollection = client.db(dbName).collection(collection);
      return dataCollection
        .find({})
        .limit(20)
        .sort({ timestamp: 1 })
        .toArray()
        .finally(() => client.close());
    });
  return mu;
}

module.exports = MongoUtils();
