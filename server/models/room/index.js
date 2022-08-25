const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const roomSchema = mongoose.Schema({
    roomId: {
        type: 'string',
        default: uuidv4,
        unique: true
    },

    users: {
        type: Array,
    },

    isPrivate: {
        type: Boolean,
        default: true
    }
})

const Room = mongoose.model('room', roomSchema)
Room.createIndexes()

module.exports = Room
