const { MongoClient, ServerApiVersion } = require('mongodb')

const url = process.env.MONGODB_URI
const client = new MongoClient(url, { useNewUrlParser: true, serverApi: ServerApiVersion.v1 });
const dbName = 'people';

async function Main() {

    await client.connect();
    console.log('Connected successfully to server');
    const db = await client.db(dbName);
    const collection = await db.collection('people');

    return collection
}

module.exports = Main