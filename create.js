const line = require("@line/bot-sdk");
const fs = require("fs");
require('dotenv').config();

const CONFIG = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_KEY
};

const client = new line.Client(CONFIG);

// リッチメニュー全体のサイズ
const WIDTH = 2500;
const HEIGHT = 1686;


client.createRichMenu({
    "size": {
        "width": WIDTH,
        "height": HEIGHT
    },
    "selected": true,
    "name": "テスト",
    "chatBarText": "課題一覧",
    "areas": [
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": WIDTH / 2,
                "height": HEIGHT
            },
            "action": {
                "type": "message",
                "text": "課題の登録"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 2) * 1,
                "y": 0,
                "width": WIDTH / 2,
                "height": HEIGHT
            },
            "action": {
                "type": "message",
                "text": "エリア2"
            },
        },
    ]
})
    .then(async (richMenuId) => {
        const buffer = await fs.createReadStream('./image_02.png');
        await client.setRichMenuImage(richMenuId, buffer);
        await client.setDefaultRichMenu(richMenuId);
    })
    .catch(e => {
        console.error(e.message);
    })
