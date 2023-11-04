const line = require("@line/bot-sdk");
const fs = require("fs");

const client = new line.Client({
    channelAccessToken: "Awvyrdq8Wbrf3Y/ZkZPkOR3PowxeMGaR1uz2P93NJAvRsRTHeMxSz3b+/+gGtcLnee4mRQmDEOR1eoXW9JtvPHS76agLkjwnYFLncbwlBxx8XTTgPuDDnqfU0rETjQ7ipA0CF6cg4pIvI4Hs/c7OLwdB04t89/1O/w1cDnyilFU=",
    channelSecret: "9fa6f8836119850f8113cb1b0514276f"
});

// リッチメニュー全体のサイズ
const WIDTH = 2500;
const HEIGHT = 1686;


client.createRichMenu({
    "size": {
        "width": WIDTH,
        "height": HEIGHT
    },
    "selected": true,
    "name": "よりみちプログラミング",
    "chatBarText": "メニュー",
    "areas": [
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "課題の登録"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 1,
                "y": 0,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア2"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 2,
                "y": 0,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア3"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 3,
                "y": 0,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア4"
            },
        },
        {
            "bounds": {
                "x": 0,
                "y": (HEIGHT / 3) * 1,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア5"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 1,
                "y": (HEIGHT / 3) * 1,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア6"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 2,
                "y": (HEIGHT / 3) * 1,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア7"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 3,
                "y": (HEIGHT / 3) * 1,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア8"
            },
        },
        {
            "bounds": {
                "x": 0,
                "y": (HEIGHT / 3) * 2,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア9"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 1,
                "y": (HEIGHT / 3) * 2,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア10"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 2,
                "y": (HEIGHT / 3) * 2,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア11"
            },
        },
        {
            "bounds": {
                "x": (WIDTH / 4) * 3,
                "y": (HEIGHT / 3) * 2,
                "width": WIDTH / 4,
                "height": HEIGHT / 3
            },
            "action": {
                "type": "message",
                "text": "エリア12"
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
