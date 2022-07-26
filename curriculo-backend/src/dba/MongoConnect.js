const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'people';

async function Main() {

    await client.connect();
    console.log('Connected successfully to server');
    const db = await client.db(dbName);
    const collection = await db.collection('people');

    return collection
}

module.exports = Main