const mongoose = require('mongoose');
var myModel = null;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST',
    'Content-Type': 'application/json'
};

const connectToDatabase = async () => {

    await mongoose.connect('mongodb+srv://client-portal-api:August2K18@ce.uojaw.mongodb.net/concurs-events-api?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

const generateSchema = async () => {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    const user = new Schema({
        id: ObjectId,
        email: String,
        createdAt: {
            type: Date,
            immutable: true
        }
    }, { timestamps: true });
    try {
        myModel = mongoose.model('news-letter-subscriptions');
    } catch (error) {
        myModel = mongoose.model('news-letter-subscriptions', user);
    }
    return myModel;
}

const pushToDatabase = async (data) => {
    var Model = await generateSchema();
    const filter = { email: data.email }

    return await Model.findOneAndUpdate(
        filter,
        data,
        {
            new: true,
            upsert: true
        }
    ).then(item => {
        return { statusCode: 201, headers, body: '{"code" : 201, "status": "Success"}' };
    }).catch(err => {
        console.log(err)
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