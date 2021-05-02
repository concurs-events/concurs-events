"use strict";

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const mongoose = require('mongoose');
var myModel = null;

const emailId = 'concursevents@gmail.com';
const refreshToken = '1//04Af9JEIKeutECgYIARAAGAQSNwF-L9Ir42Hs_99wiOQqofXJzw7WokEo1bKMDeahhhc9YOeGBVlv5HcP1oMZ4AehkTZbqweF2cc';
const clientSecret = 'f8b-AnTNC2FMWP1G-CklGTHu';
const clientId = '802680132294-1q9l7dvufq00cnineo9531cqg29nvb49.apps.googleusercontent.com';
const clientUrl = 'https://developers.google.com/oauthplayground';

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

const countData = async () => {
    var Model = await generateSchema();

    return Model.countDocuments({}, function (err, c) {
        return c
    });

};

const createMailServer = async (accessToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: emailId,
            accessToken,
            clientId,
            clientSecret,
            refreshToken
        }
    });

    return transporter;
}

const getAccessToken = async () => {
    const oauth2Client = new OAuth2(
        clientId,
        clientSecret,
        clientUrl
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });

    return accessToken;
}

const sendMail = async (transporter, data) => {
    const count = await countData()

    const result = await transporter.sendMail({
        subject: "Concurs Events - New News Letter Subscription!!",
        to: process.env.RECEVER_MAIL_ID,
        from: emailId,
        html: await getTemplate(data.email, count),
        context: {
            email: data.email,
            total: count
        }
    });
    return result;
};

module.exports.handler = async (event, context) => {
    await connectToDatabase();

    const accessToken = await getAccessToken();
    const transporter = await createMailServer(accessToken);
    const result = await sendMail(transporter, JSON.parse(event.body))
    return { statusCode: 201, headers, body: '{"code" : 201, "status": "success"}' };
};

const getTemplate = async (email, count) => {
    return `<p>There is a new News Letter Subscription</p>
  <br>
  <ul>
      <li>New User : ` + email + `</li>
      <li>Total Subscriptions :  ` + count + `</li>
  </ul>`
};