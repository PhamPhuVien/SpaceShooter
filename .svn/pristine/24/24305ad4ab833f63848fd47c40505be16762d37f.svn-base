const express = require('express');
const router = express.Router();
const appEx = express();
const UserModel = require('../models/userModel');
const asyncMiddleware = require('../middleware/asyncMiddleware');

//appEx.use(express.static(__dirname + '\\..\\..\\public'));
//appEx.use(express.static(__dirname + '/../public'));      // Work With Static Such As Image, CSS, JS.

// Run Game. NO NEED???
// router.get('/', (req, res, next) => {
//     //res.sendFile('c:/1PVData/SkyDrive/NodeJS/GameSpaceShooter/public/index.html');
// })

// Run As Admin.
router.get('/admin', (req, res, next) => {
    res.sendFile('c:/1PVData/SkyDrive/NodeJS/GameSpaceShooter/public/admin.html');
})

// Check Connection Status.
router.get('/status', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok PV Status' });
});

// Login.
router.post('/login', asyncMiddleware(async (req, res, next) => {
    console.log('ROUTER: Login ' + JSON.stringify(req.body));

    const { email, name, score } = req.body;
    const user = await UserModel.findOne({ email }, function (error, data) {
        if (error) {
            res.send(error);
        }
        else {
            if (data == null) {
                console.log('ROUTER: Login 1');
            } else {
                console.log('ROUTER: Login 2 ' + data);
                console.log('ROUTER: Login 3 ' + JSON.stringify(data));
            }
        }
    });

    if (!user) {
        console.log('Login FAILED: Email Does NOT Exist So Create New Player.');

        await UserModel.create({ email, name, score });
    }

    console.log('ROUTER: Login RES ' + JSON.stringify(user));

    // Response.
    var string = { login: 'OK' };

    res.send(string);
    res.status(200);
    res.end();
}));

// Logout.
router.post('/logout', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'ok' });
});

// Token.
router.post('/token', (req, res, next) => {
    res.status(200);
    res.json({ 'status': 'Token OK' });
});

module.exports = router;