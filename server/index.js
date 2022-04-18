const express = require('express');
const socket = require('socket.io');
const http = require("http");
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors())

app.get("/", (req, res) => {
    res.send("server is running")
})

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

io.on("connection", (socket) => {

    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callended")
    })

    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("calluser", { signal: signalData, from, name })
    });

    socket.on("answercall", (data) => {
        io.to(data.to).emit("callaccepted", data.signal)
    })
})