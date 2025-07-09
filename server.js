const express = require('express');
const app = express();
const port = 3000;

// ex1
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`);
});

// ex2
app.get('/roll/:number', (req, res) => {
    const numberParam = req.params.number;
    const number = parseInt(numberParam);
    
    if (isNaN(number)) {
        res.send("You must specify a number.");
    } else {
        const randomNum = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${randomNum}`);
    }
});

// ex3
