const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    roomId: {
        type: String,
    },

    message: {
        type: Object
    },

    date: {
        type: Date,
    },
}, {
    timestamps: true
})

const Message = mongoose.model('message', messageSchema)
Message.createIndexes()

module.exports = Message