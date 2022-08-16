import express from "express";
import { createServer } from 'http'
import { Server } from "socket.io";
import conn from "./db/index.js";
import userRouter from './routes/user/index.js'
import bodyParser from 'body-parser'

conn()
const PORT = 5000
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.json())

app.use('/api/v1/user/', userRouter)

// io.on("connection", (socket) => {
//     socket.emit('connection', socket.id)

//     socket.on('join', (e) => {
//         socket.join(e)
//         socket.broadcast.to(e).emit('connected', 'Joined Room ')
//     })


//     socket.on('sendMsg', (...e) => {
//         console.log(rooms);
//         socket.broadcast.to(e[1]).emit('recieveMsg', e[0])
//     })


// });

httpServer.listen(PORT, () => console.log('Server Run'))