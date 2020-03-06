const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017,
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
        .db()
        .admin()
        .listDatabases()
        .then(result => result.databases)
        .finally(() => client.close());
    });

  mu.mongo.collection = dbName =>
    mu.connect().then(client => {
      return client
        .db(dbName)
        .listCollections()
        .toArray()
        .finally(() => client.close());
    });

  mu.mongo.collectionData = (dbName, collectionName) =>
    mu.connect().then(client => {
      const dataCollection = client.db(dbName).collection(collectionName);
      return dataCollection
        .find({})
        .limit(20)
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close());
    });

  mu.mongo.insertCollectionData = (dbName, collectionName, info) =>
    mu.connect().then(client => {
      const data = client.db(dbName).collection(collectionName);
      return data.insertOne({ name: info }).finally(() => client.close());
    });

  mu.mongo.deleteCollectionData = (dbName, collectionName, info) =>
    mu.connect().then(client => {
      const data = client.db(dbName).collection(collectionName);
      return data.deleteOne({ name: info }).finally(() => client.close());
    });

  mu.mongo.updateCollectionData = (dbName, collectionName, oldInfo, newInfo) =>
    mu.connect().then(client => {
      const data = client.db(dbName).collection(collectionName);
      return data
        .updateOne({ name: oldInfo }, { $set: { name: newInfo } })
        .finally(() => client.close());
    });

  return mu;
}

module.exports = MongoUtils();
