const express = require("express");
const app = express();
const path = require("path")
const mongoose = require("mongoose")
const ejsMate = require("ejs-mate")
app.use(express.static('public'));

app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')));



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


// サーバーの立ち上げ
app.listen(3000,() => {
    console.log("ポート3000で受付中")
})