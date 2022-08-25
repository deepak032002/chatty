const express = require("express")
const { createServer } = require('http')
const { Server } = require("socket.io")
const conn = require("./db/index.js")
const userRouter = require('./routes/user/index.js')
const bodyParser = require('body-parser')
conn()
const PORT = 5000
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use("/uploads", express.static('./uploads'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.json())

app.use('/api/v1/user/', userRouter)



io.on("connection", (socket) => {

    socket.emit('connection', socket.id)
    socket.on('join', ({ roomId }) => {
        socket.join(roomId)
        socket.on('msg', ({ profilepic, msg, from, date, time }) => {
            socket.broadcast.to(roomId).emit('msg', { profilepic, msg, from, date, time, self: false })
        })
    })

    socket.on('leave', ({ roomId }) => {
        socket.leave(roomId)
    })

});

httpServer.listen(PORT, () => console.log('Server Run'))