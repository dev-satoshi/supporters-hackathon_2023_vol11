const line = require("@line/bot-sdk");
const express = require("express");
require('dotenv').config();

const CONFIG = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_KEY
};

const PORT = 3000;
const client = new line.Client(CONFIG);
// 外部のjsonファイルを読み込む
const flexMessage = require('./addTaskFlexMessage.json');
const app = express();


app.post("/webhook", line.middleware(CONFIG), (req, res) => sendFlexMessage(req, res))


function handleBot(req, res) {
    res.status(200).end();
    req.body.events.map((event) => {
        // 外部で定義されたclientオブジェクトを使用します
        client.replyMessage(event.replyToken, {
            type: "text",
            text: "Hello, world"
        }).then(() => {
            console.log("Reply sent!");
        }).catch((err) => {
            // エラーハンドリングを追加
            console.error("An error occurred when sending reply:", err);
        });
        console.log("event", event);
    });
}


function sendFlexMessage(req, res) {
    res.status(200).end();
    Promise.all(req.body.events.map(event => {
        return client.pushMessage(event.source.userId, [flexMessage])
            .then(() => {
                console.log(`Message sent to ${event.source.userId}`);
            })
            .catch(err => {
                console.error(`Error sending message to ${event.source.userId}:`, err);
            });
    }))
        .then(() => {
            console.log('All messages sent successfully');
        })
        .catch(err => {
            console.error('An error occurred while sending messages:', err);
        });
}


app.listen(PORT, () => console.log(`Listening on ${PORT}`));