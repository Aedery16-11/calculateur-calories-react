import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://root:root@localhost:27017';
const client = new MongoClient(url);
client.connect();
export const db = client.db('calory');