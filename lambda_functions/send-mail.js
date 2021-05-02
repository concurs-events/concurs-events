"use strict";
const nodemailer = require("nodemailer");
const path = require('path')
const hbs = require("nodemailer-express-handlebars");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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

    const handlebarOptions = {
        viewEngine: {
            extName: ".hbs",
            partialsDir: path.resolve('./templates'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./templates'),
        extName: ".hbs",
    };


    transporter.use('compile', hbs(handlebarOptions))
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
    const result = await transporter.sendMail({
        subject: "Concurs Events - New Enquirey!!",
        //html: { path: 'mailTemplate.html' },
        to: process.env.RECEVER_MAIL_ID,
        from: emailId,
        html: await getTemplate(data),
    });
    return result;
};

module.exports.handler = async (event, context) => {
    const accessToken = await getAccessToken();
    const transporter = await createMailServer(accessToken);
    const result = await sendMail(transporter, JSON.parse(event.body))
    console.log(result)
    return { statusCode: 201, headers, body: '{"code" : 201, "status": "success"}' };
};

const getTemplate = async (data) => {
    return `<html>
    <head>
    <style>
    #customers {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    #customers td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    #customers tr:nth-child(even){background-color: #f2f2f2;}
    
    #customers tr:hover {background-color: #ddd;}
    
    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #4CAF50;
      color: white;
    }
    </style>
    </head>
    <body>
    <p>
      There is a new enquiry for some of our events 
    </p>
    <table id="customers">
        <tr>
          <th>name</th>
          <th>email</th>
          <th>message</th>
        </tr>
        <tr>
        <td>`+ data.name + `</td>
        <td>`+ data.email + `</td>
        <td>`+ data.message + `</td>
      </tr>
    </table>
    </body>
    </html>`
};