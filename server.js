const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const message = require('./routes/message');
const socketIO = require('socket.io');

const port = process.env.port || 3000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/message', message);

const server = http.createServer(app);
const io = socketIO(server);
app.set('io', io);

const flowmessages=[
    {"message":"Let’s start with name. What is your _*Full Name*_?"},
    {"message":"What is your _*EmailId_?"},
    {"message":"Please enter a valid Date of Birth in format _*DD/MM/YYYY*_."},
    {"message":"Please enter a valid 12-digit _*Aadhaar Number*_."},
    {"message":"Please enter a valid 10-digit _*PAN Number*_."},
]

io.on('connection', function (socket) {
    socket.on('newmessage', function (meesage) {
        console.log(meesage);
        setTimeout(() => {
            const outgoingMessage=flowmessages[meesage.index];
            if(outgoingMessage){
                io.emit('newmessage', outgoingMessage);
            }
        }, 5000);
    });
    io.emit('newmessage',flowmessages[0] );
});

app.use(express.static(path.join(__dirname, 'dist/chatbot-ui')));


server.listen(port, (response) => {
    console.log("server running on port " + port);
});
