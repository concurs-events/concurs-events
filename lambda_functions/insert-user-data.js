
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST'
};

let cachedDb = null;
const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = "mongodb+srv://client-portal-api:August2K18@ce.uojaw.mongodb.net/concurs-events-api?retryWrites=true&w=majority";
const DB_NAME = 'concurs-events-api';


const connectToDatabase = async (uri) => {
    // we can cache the access to our database to speed things up a bit
    // (this is the only thing that is safe to cache here)
    if (cachedDb) return cachedDb;

    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true,
    });
    cachedDb = client.db(DB_NAME);

    return cachedDb;
};

const pushToDatabase = async (db, data) => {
    if (data.name && data.email) {
        await db.collection("contact-us").insertMany([data]);
        return { statusCode: 201, headers, body: '{"code" : 201, "status": "success"}' };
    } else {
        return { statusCode: 422, headers, body: '{"code" : 422, "status": "Not Found"}' };
    }
};

module.exports.handler = async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase(MONGODB_URI);

    switch (event.httpMethod) {
        case "POST":
            return pushToDatabase(db, JSON.parse(event.body));
        default:
            return { statusCode: 400, headers, body: '{"code" : 400, "status": "Not Found"}' };
    }
};