require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path")
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")
app.use(express.static('public'));
const axios = require("axios")  


const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;


app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')));

// Base64エンコード（client_id:client_secret）
const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

// アクセストークンを取得する関数
async function getAccessToken() {
try {
    const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
        grant_type: 'client_credentials'
    }),
    {
        headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    );

    const accessToken = response.data.access_token;
    console.log('アクセストークン:', accessToken);
    return accessToken;

} catch (error) {
    if (error.response) {
        console.error("ステータスコード:", error.response.status);
        console.error("レスポンスデータ:", error.response.data || "レスポンスデータがありません");
    } else if (error.request) {
        console.error("リクエストは送信されたが応答がありません:", error.request);
    } else {
        console.error("エラー詳細:", error.message);
    }
}
}



// 検索用ルート
app.get("/random", async (req, res) => {
    const genres = ["pop", "rock", "jazz", "classical", "hip-hop", "electronic", "country", "blues", "reggae", "metal"]; // ジャンルリスト
    const randomGenre = genres[Math.floor(Math.random() * genres.length)]; 
    const accessToken = await getAccessToken();
    if( !accessToken ) {
        return res.status(500).send("アクセストークンの取得に失敗しました。");
    } else {
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    q: `genre:"${randomGenre}"`,
                    type: "track",
                    market: "JP",
                    limit: 1
                } 
                })
                const randomItems = response.data.tracks.items[0]
                console.log(response.data.tracks.items[0])
                res.render("random", {randomItems})
        } catch (error) {
            res.send("エラーが発生しました。")
    }
}}); 

mongoose.connect('mongodb://127.0.0.1:27017/spotify',{useNewUrlParser:true,useUnifiedTopology:true,})
.then(() => {
    console.log("DBにコネクションOK")
})
.catch((err) => {
    console.log("DBにコネクション失敗")
    console.log(err)
})


app.get("/", (req,res) => {
    res.render("home")
})


console.log("クライアントID:", process.env.CLIENT_ID);


// サーバーの立ち上げ
app.listen(3000,() => {
    console.log("ポート3000で受付中")
})