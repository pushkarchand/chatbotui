const express = require('express');
const router = express.Router();
const messages = [];

router.post('/', (req, res) => {
    const io = req.app.get('io');
    const message = { description: req.body.description };
    messages.push(message);
    io.emit('newTaskAdded');
});

router.get('/', (req, res) => {
    res.send(messages);
});
module.exports = router;
