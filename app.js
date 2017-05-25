const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');
let io = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
io = io.listen(server);
const users = [];
const connections = [];

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on("connected", () => {
    console.log("Connected to Database " + config.database);
});

//Database Error
mongoose.connection.on("err", (err) => {
    console.log(err);
});

const port = 3000;

const user = require('./routes/users');

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//bodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Calling passport.js with parameter passport to the function
require('./config/passport')(passport);

//for all user routes
app.use('/users', user);

//Index Route
app.get('/', (req, res) => {
    res.send("home page")
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

io.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connected: ' + connections.length);

    // Deleting Disconnected Users
    socket.on('disconnect', (data) => {
        users.splice(users.indexOf(socket.username), 1);
        updateUsername();
        connections.splice(connections.indexOf(socket), 1);
    });

    // Send Message
    socket.on('message', function(data){
        io.emit('message', {msg: data, user: socket.username});
    });

    // Adding New User
    socket.on('newUser', (data) => {
        socket.username = data;
        if(users.indexOf(socket.username) == -1) {
            users.push(socket.username);
        }
        updateUsername();
    });

    function updateUsername() {
        io.sockets.emit('getUsers', users);
    }
});

//Start Server
server.listen(process.env.PORT || port, () => {
    console.log("Server Starting on port " + port +"/"+process.env.PORT);
});