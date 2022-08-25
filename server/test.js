const io = require('socket.io-client')

const socket = io('http://localhost:5000/')

const test = () =>{

    socket.on('connection', (id) =>{
        console.log(id);
    })

    socket.emit('getuser')
    socket.on('allUser', (users) =>{
        console.log(users);
    })

}

test()