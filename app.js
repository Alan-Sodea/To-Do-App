const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(express.static("./Static/"));
app.set("views", "./Templates");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) =>
{
    res.status(200).render("index");
})

app.use((req, res) =>
{
    res.redirect("/");
})

app.listen(8000, ()=>
{
    console.log("Waiting on port 8000")
});
