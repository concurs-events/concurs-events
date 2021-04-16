const mongoose = require('mongoose');
var myModel = null;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST'
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

    if (myModel != null) { return myModel };

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    const user = new Schema({
        id: ObjectId,
        name: String,
        email: String,
        attending: String,
        udatedDate: {
            type: Date,
            default: Date.now
        }
    });
    myModel = mongoose.model('contact-us', user);
    return myModel;
}

const pushToDatabase = async (data) => {
    var Model = await generateSchema();
    var new_user = new Model(data);
    await new_user.save().then(item => {
        return { statusCode: 201, headers, body: '{"code" : 201, "status": "success"}' };
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