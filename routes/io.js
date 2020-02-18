var express = require('express');
var router = express.Router();

module.exports = io => {
    io.on('connection', socket => {

        io.emit('serverSendDataObject', {
            command: 'test',
            payload: 123
        });
        
        io.on('clientSendDataObject', obj => {

        });
    });

    return router;
}