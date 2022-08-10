import { MongoClient } from "mongodb";

const url =
  process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = "events";

export async function connectDatabase() {
  await client.connect();
}

export function disconnectDatabase() {
  client.close();
}

export async function insertDocument(collection, document) {
  const db = client.db(dbName);
  const newCollection = db.collection(collection);

  const result = await newCollection.insertOne(document);

  return result;
}

// find comments in database, sort by given sort value, filter and convert to an array.
export async function getAllDocuments(collection, sort, filter = {}) {
  const db = client.db(dbName);
  const newCollection = db.collection(collection);

  const documents = await newCollection.find(filter).sort(sort).toArray();

  return documents;
}
