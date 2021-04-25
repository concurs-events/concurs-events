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
        myModel = mongoose.model('contact-us');
    } catch (error) {
        myModel = mongoose.model('contact-us', user);
    }
    return myModel;
}

const pushToDatabase = async (data) => {
    var Model = await generateSchema();
    var new_user = new Model(data);
    return await new_user.save().then(item => {
        let result = {};
        result.code = '201'
        result.status = 'success'
        result.name = item.name
        result.email = item.email
        result.message = item.message
        result.attending = item.attending
        return { statusCode: 201, headers, body: JSON.stringify(result) };
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