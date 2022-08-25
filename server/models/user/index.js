const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    privateRoom: {
        type: String,
        default: ""
    },
    contact: {
        type: Array
    }
})

const User = mongoose.model('user', userSchema)
User.createIndexes()

module.exports = User