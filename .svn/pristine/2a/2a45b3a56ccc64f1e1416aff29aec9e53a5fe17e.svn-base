const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const UserModel = require('../models/userModel');
const routerSecure = express.Router();

// Change Player Name.
routerSecure.post('/changePlayerName', asyncMiddleware(async (req, res, next) => {
    console.log('ROUTE: Change Player Name: ' + JSON.stringify(req.body));

    // Update Base On Email.
    await UserModel.updateOne({ email: req.body.email }, { $set: { name: req.body.name } });

    // Response.
    var string = { changePlayerName: 'OK' };

    res.send(string);
    res.status(200);
    res.end();
}));

// Submit Score.
routerSecure.post('/submitScore', asyncMiddleware(async (req, res, next) => {
    console.log('ROUTE: Submit Score: ' + JSON.stringify(req.body));

    // Update Base On Email.
    await UserModel.updateOne({ email: req.body.email }, { $set: { highScore: req.body.score } });

    // Response.
    var string = { submitScore: 'OK' };

    res.send(string);
    res.status(200);
    res.end();
}));

// Get Scores.
routerSecure.get('/scores', asyncMiddleware(async (req, res, next) => {
    console.log('ROUTE: Get Scores: ' + JSON.stringify(req.body));

    // Find ALL. Can't Process With JSON.
    const users = await UserModel.find({}, 'email name timesUpdated highScore -_id').sort({ highScore: -1 }).limit(10);

    // Response.
    var string = { scores: 'OK' };

    res.send(string);
    res.status(200);
    res.end();
}));

// Get Times User Updated.
routerSecure.post('/getTimesUserUpdated', asyncMiddleware(async (req, res, next) => {
    console.log('ROUTE: Get Times User Updated: ' + JSON.stringify(req.body));

    // Find One. Ok Process With JSON.
    const userInfo = await UserModel.findOne({ email: req.body.email }, function (error, result) {
        console.log('ROUTE: Get Times User Updated: Name ' + result.name);
        console.log('ROUTE: Get Times User Updated: Times Updated: ' + result.timesUpdated);
    });

    var timesUpdatedNew = userInfo.timesUpdated;

    console.log('ROUTE: Get Times User Updated: timesUpdated = ' + timesUpdatedNew);


    // Response.
    var string = { updateTimes: timesUpdatedNew };

    res.send(string);
    res.status(200);
    res.end();
}));

// Post Increase Times User Updated.
routerSecure.post('/timesUserUpdated', asyncMiddleware(async (req, res, next) => {
    console.log('ROUTE: Times User Updated: ' + JSON.stringify(req.body));

    // Find One. Ok Process With JSON.
    const userInfo = await UserModel.findOne({ email: req.body.email }, function (error, result) {
        console.log('ROUTE: Times User Updated: Name ' + result.name);
        console.log('ROUTE: Times User Updated: Times Updated: ' + result.timesUpdated);
    });

    console.log('ROUTE: Times User Updated: timesUpdated');
    var timesUpdatedNew = userInfo.timesUpdated + 1;
    await UserModel.updateOne({ email: req.body.email }, { $set: { timesUpdated: timesUpdatedNew } });

    // Response.
    var string = { timesUserUpdated: 'OK' };

    res.send(string);
    res.status(200);
    res.end();
}));

// Post Delete User.
routerSecure.post('/deleteUser', asyncMiddleware(async (req, res, next) => {
    console.log('ROUTE: Delete User Info: ' + JSON.stringify(req.body));

    await UserModel.deleteOne({ email: req.body.email }, function (error, result) {
        if (error) {
            console.log('Delete User: Error');
        }
        else {
            console.log('Delete User: ' + req.body.email + ' Ok.');
        }
    });

    // Response.
    var string = { UserWithEmailDeleted: req.body.email };

    res.send(string);
    res.status(200);
    res.end();
}))

module.exports = routerSecure;