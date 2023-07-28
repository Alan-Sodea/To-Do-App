const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const message = require("./Models/messages");
app.use(express.static("./Static/"));
app.set("views", "./Templates");
app.set("view engine", "ejs");

let mytasks = []

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) =>
{
    (async () =>
    {
        try 
        {
            await mongoose.connect("mongodb://127.0.0.1:27017/Messages")    
            console.log("Database Connected");
            mytasks = await message.find();
        } 
        catch (error) 
        {
            console.log("error");
        }
        res.status(200).render("index", {tasks : mytasks});
    })();
})

app.post("/new", (req, res) =>
{
    (async () =>
    {
        if (req.body.task!="")
        {
            try 
            {
                await mongoose.connect("mongodb://127.0.0.1:27017/Messages")    
                console.log("Database Connected");
                try
                {
                    all = await message.find()
                    value = all.length.toString()
                }
                catch
                {
                    value = "0";
                }
                console.log("value : "+value)
                console.log("text : "+req.body.task)
                await message({
                    task : req.body.task,
                    id : value
                }).save();


            } 
            catch (error) 
            {
                console.log(error);
            }
        }
    })()

    res.status(200).redirect("/");
})

app.use((req, res) =>
{
    console.log(req.body.id);
    (async () =>
    {
        try 
        {
            await message.findOneAndDelete({id : req.body.id});
        }
        catch (error)
        {
            console.log(error);
        }

    })();
    res.redirect("/");
})

app.listen(8000, ()=>
{
    console.log("Waiting on port 8000...")
});


// e.target.getAttribute("id")