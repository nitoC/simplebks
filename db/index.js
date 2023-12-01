const { MongoClient } = require("mongodb");

const dotenv = require('dotenv')
dotenv.config()

const client = new MongoClient(process.env.CONNSTRING, { useNewUrlParser: true, useUnifiedTopology: true });


async function dbConnection() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB server');
    } catch (error) {
        console.error('Error connecting to the MongoDB server:', error.message);
    }
}


module.exports = {
    client,
    dbConnection
}