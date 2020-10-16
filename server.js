const express = require('express');
const path = require('path')
const app = express();
const http = require('http');
const socketio = require('socket.io');

const formatMessage = require('./utils/messages')

const { userJoin, getCurrentUser } = require('./utils/users')


const server = http.createServer(app);

const io = socketio(server);


//set static folder
app.use(express.static(path.join(__dirname, 'public')))


const botName = "ChatCord bot";

//Run when a client connect 
io.on('connection', socket => {
    console.log('New WS Connection...');

    socket.on(`joinRoom`, ({ username, room }) => {

        socket.join()

        //welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord'));

        //BroadCast when a user connects except for themselves 
        socket.broadcast.emit('message', formatMessage("User", 'A user has joined the chat'));
    })





    // listen for chatmessage 
    socket.on(`chatMessage`, (msg) => {
        io.emit('message', formatMessage('User', msg))
    })


    // Run when client disconnect
    socket.on('disconnect', () => {
        io.emit(`message`, formatMessage('User', 'A user has left the chat'))
    })


})


const PORT = 80 || process.env.PORT;



server.listen(PORT, () => console.log(`Server running on port ${PORT}`));