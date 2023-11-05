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
const TABHEIGHT = HEIGHT * 0.09 // 左のタブ

// // 1ページ目
// client.createRichMenu({
//     "size": {
//         "width": WIDTH,
//         "height": HEIGHT
//     },
//     "selected": true,
//     "name": "tab_2",
//     "chatBarText": "課題一覧",
//     "areas": [
//         // {
//         //     "bounds": {
//         //         "x": 0,
//         //         "y": 0,
//         //         "width": WIDTH / 2,
//         //         "height": TABHEIGHT
//         //     },
//         //     "action": {
//         //         "type": "richmenuswitch",
//         //         "richMenuAliasId": "richmenu-alias-b", //後で設定する
//         //         "data": "richmenu-changed-to-b"
//         //     },
//         // },
//         {
//             "bounds": {
//                 "x": (WIDTH / 2) * 1,
//                 "y": 0,
//                 "width": WIDTH / 2,
//                 "height": TABHEIGHT
//             },
//             "action": {
//                 "type": "richmenuswitch",
//                 "richMenuAliasId": "richmenu-alias-b", //後で設定する
//                 "data": "richmenu-changed-to-b"
//             },
//         },
//         {
//             "bounds": {
//                 "x": 0,
//                 "y": TABHEIGHT,
//                 "width": WIDTH / 2,
//                 "height": HEIGHT
//             },
//             "action": {
//                 "type": "message",
//                 "text": "課題の登録"
//             },
//         },
//         {
//             "bounds": {
//                 "x": (WIDTH / 2) * 1,
//                 "y": TABHEIGHT,
//                 "width": WIDTH / 2,
//                 "height": HEIGHT / 2
//             },
//             "action": {
//                 "type": "message",
//                 "text": "課題一覧の表示"
//             },
//         },
//         {
//             "bounds": {
//                 "x": (WIDTH / 2) * 1,
//                 "y": TABHEIGHT + (HEIGHT / 2) * 1,
//                 "width": WIDTH / 2,
//                 "height": HEIGHT / 2
//             },
//             "action": {
//                 "type": "message",
//                 "text": "提出率の確認"
//             },
//         },
//     ]
// })


// 2ページ目
client.createRichMenu({
    "size": {
        "width": WIDTH,
        "height": HEIGHT
    },
    "selected": true,
    "name": "tab_2",
    "chatBarText": "課題一覧",
    "areas": [
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": WIDTH / 2,
                "height": TABHEIGHT
            },
            "action": {
                "type": "richmenuswitch",
                "richMenuAliasId": "richmenu-alias-a", //後で設定する
                "data": "richmenu-changed-to-a"
            },
        },
        // {
        //     "bounds": {
        //         "x": (WIDTH / 2) * 1,
        //         "y": 0,
        //         "width": WIDTH / 2,
        //         "height": TABHEIGHT
        //     },
        //     "action": {
        //         "type": "richmenuswitch",
        //         "richMenuAliasId": "richmenu-alias-b", //後で設定する
        //         "data": "richmenu-changed-to-b"
        //     },
        // },
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": WIDTH / 2,
                "height": HEIGHT
            },
            "action": {
                "type": "message",
                "text": "学生証の表示"
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
                "text": "クーポンの表示"
            },
        },
    ]
})


    .then(async (richMenuId) => {
        const buffer = await fs.createReadStream('./image_03.png');
        await client.setRichMenuImage(richMenuId, buffer);
        await client.setDefaultRichMenu(richMenuId);
    })
    .catch(e => {
        console.error(e.message);
    })
