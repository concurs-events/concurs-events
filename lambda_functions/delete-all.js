const mongoose = require('mongoose');
var myModel = null;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST',
    'Content-Type': 'application/json',
};

const connectToDatabase = async () => {

    await mongoose.connect('mongodb+srv://client-portal-api:August2K18@ce.uojaw.mongodb.net/concurs-events-api?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

const generateSchema = async (model) => {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    const user = new Schema({
        id: ObjectId,
        name: String,
        email: String,
        attending: String,
        message: String,
        udatedDate: {
            type: Date,
            default: Date.now
        }
    });
    try {
        myModel = mongoose.model(model);
    } catch (error) {
        myModel = mongoose.model(model, user);
    }
    return myModel;
}

const pushToDatabase = async (data) => {
    var Model = await generateSchema(data.model);
    return Model.deleteMany().then(item => {
        return { statusCode: 200, headers, body: '{"code" : 201, "status": "deleted all records from model"}' };
    }).catch(err => {
        return { statusCode: 422, headers, body: '{"code" : 422, "status": "Not Found"}' };
    });
};


module.exports.handler = async (event, context) => {
    await connectToDatabase();

    switch (event.httpMethod) {
        case "POST":
            return await pushToDatabase(JSON.parse(event.body));
        default:
            return { statusCode: 400, headers, body: '{"code" : 400, "status": "Not Found"}' };
    }
};