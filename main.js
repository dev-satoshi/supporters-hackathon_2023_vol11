const line = require("@line/bot-sdk");
const express = require("express");
require('dotenv').config();

const CONFIG = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_KEY
};

const PORT = 3000;
const client = new line.Client(CONFIG);
const flexMessage = require('./addTaskFlexMessage.json');
const app = express();

const appState = {
    addTaskMode: false,
    messageCount: 0,
};

app.post("/webhook", line.middleware(CONFIG), (req, res) => {
    sendFlexMessage(req, res, appState);
});

function sendFlexMessage(req, res, appState) {
    res.status(200).end();
    let responseMessage = req.body.events[0].message.text;

    if (appState.addTaskMode) {
        createTask(req, res, appState);
        appState.messageCount++;
        if (appState.messageCount > 1) {
            appState.messageCount = 0;
            appState.addTaskMode = false;
        }
    } else {
        if (responseMessage === "課題の登録") {
            appState.addTaskMode = true;
            appState.messageCount = 0;
            createTask(req, res, appState);
            appState.messageCount++;
        } else if (responseMessage === "課題の一覧表示") {
            // 一覧表示メッセージの送信処理
            sendListOfTasks(req, res);
        }
    }
}

function createTask(req, res, appState) {
    const messageContent = ["登録したい課題の名前を入力してください", "課題の期限を入力してください"];
    req.body.events.forEach((event) => {
        client.replyMessage(event.replyToken, {
            type: "text",
            text: messageContent[appState.messageCount]
        }).then(() => {
            console.log("Reply sent!");
        }).catch((err) => {
            console.error("An error occurred when sending reply:", err);
        });
    });
}

function sendListOfTasks(req, res) {
    req.body.events.forEach((event) => {
        client.pushMessage(event.source.userId, [flexMessage])
            .then(() => {
                console.log(`Message sent to ${event.source.userId}`);
            })
            .catch((err) => {
                console.error(`Error sending message to ${event.source.userId}:`, err);
            });
    });
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
