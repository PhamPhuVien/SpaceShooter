//// Vars.
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var http = require('http');
var io = require('socket.io').listen(server);
var routes = require('./routes/routes');
var routesSecure = require('./routes/routesSecure');

//// User To Send HTTP Request.
function SendHTTPRequest(socket, data, pathUrl) {
    console.log('SendHTTPRequest: With Data ' + data + '. Path: ' + pathUrl);

    const req = http.request(
        {
            host: 'localhost',
            port: '5000',
            path: pathUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        function (clientResponse) {
            console.log('SendHTTPRequest: Response 0');

            clientResponse.on('data', function (chunk) {
                console.log('SendHTTPRequest: Response 1 BODY: ' + chunk);

                console.log('pathUrl0 = ' + pathUrl);
                if (pathUrl == '/login') {
                    console.log('pathUrl1 = ' + pathUrl);
                    socket.emit('dataLogin', JSON.parse(chunk));
                }
            })
        }
    );

    req.write(data);
    req.end();

    console.log('SendHTTPRequest: RES Data End');
}

//// Socket IO.
io.on('connection', function (socket) {
    // Check User Connect Or Disconnect.
    console.log('A User Connected');

    // Remove The Player If Disconnect.
    socket.on('disconnect', function () {
        console.log('User Disconnected');
    });

    // SOCKET.IO: Player Login.
    socket.on('PlayerLogin', function (data) {
        console.log('PlayerLogin.');

        SendHTTPRequest(socket, data, '/login');
    });

    // SOCKET.IO: Change Player Name.
    socket.on('ChangePlayerName', function (data) {
        console.log('Change Player Name.');

        SendHTTPRequest(socket, data, '/changePlayerName');
    });

    // SOCKET.IO: Submit Score.
    socket.on('SubmitScore', function (data) {
        console.log('SubmitScore.');

        SendHTTPRequest(socket, data, '/submitScore');
        SendHTTPRequest(socket, data, '/timesUserUpdated');

        // Send Broadcast To Other User.
        var userInfo = {
            email: data.email,
        };

        // Emit Broadcast Event Submit Score For All Other Users.
        socket.broadcast.emit('aPlayerUpdatedTheirScore', data);
    });

    // SOCKET.IO: Get User Info.
    socket.on('GetUserInfo', function (data) {
        console.log('Get User Info');

        SendHTTPRequest(socket, data, '/getUserInfo');
    });
});

//// Mongo. Create Mongo Connection.
const uri = 'mongodb+srv://admin:admin@cluster0-myhtb.mongodb.net/ShooterGame?retryWrites=true';

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('error', (error) => {
    console.log('Connect Mongo ERROR: ' + error);
    process.exit(1);
});

mongoose.connection.on('connected', function () {
    console.log('Connected To Mongo.');
});

//// App. Parse The Body Of Incomming Requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));      // Work With Static Such As Image, CSS, JS.
app.use('/', routes);
app.use('/', routesSecure);

//// Server Listen.
server.listen(5000, function () {
    console.log('\nServer Is Listening On Port: ' + server.address().port);
    console.log('=================================');
});