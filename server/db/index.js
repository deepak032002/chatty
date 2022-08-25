const mongoose = require('mongoose')

const conn = async () => {
    try {

        const res = await mongoose.connect('mongodb://127.0.0.1:27017/chat');

        if (res) {
            console.log('Connect To Database Successfully');
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = conn

