'use strict';
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
server.use(express.static('./'));
server.get('/test', (req, res) => {
    res.send('your test worked');
})
server.listen(PORT, () => console.log('listening on port', PORT))