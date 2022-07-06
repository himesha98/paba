const express = require("express");
const User = require("./models/User");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const uuid = require('uuid');



dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("connected to mongoDB");
});
app.use(express.json());




app.post("/createuser", async (req, res) => {

    try {
        const newUser = new User({
            userid: uuid.v1(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,

        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


app.get("/getusers", function (req, res) {
    let userList = [];
    User.find({}, function (err, data) {
        if (!err) {
            data.map((user)=> {
                const fetcheduser ={
                    "firstname" :user.firstname,
                    "lastname":user.lastname,
                    "userid":user.userid
                }
                userList.push(fetcheduser);
            })
            res.status(200).json(userList);
        } else {
            throw err;
        }
    }).clone().catch(
        function(err){ 
            console.log(err);
        });
});

app.listen(8800, () => {
    console.log("back end runing");
})