const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    }
},
);

module.exports = mongoose.model("User", UserSchema);


