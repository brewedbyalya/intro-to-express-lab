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
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];

    app.get('/collectibles/:index', (req, res) => {
        const index = parseInt(req.params.index);
        
        if (isNaN(index) || index < 0 || index >= collectibles.length) {
            res.send("This item is not yet in stock. Check back soon!");
        } else {
            const item = collectibles[index];
            res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
        }
    });

    // ex 4
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    app.get('/shoes', (req, res) => {
        let filteredShoes = [...shoes];
        
        // min price
        if (req.query['min-price']) {
            const minPrice = parseFloat(req.query['min-price']);
            filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
        }
        
        // max price
        if (req.query['max-price']) {
            const maxPrice = parseFloat(req.query['max-price']);
            filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
        }
        
        // type 
        if (req.query.type) {
            filteredShoes = filteredShoes.filter(shoe => 
                shoe.type.toLowerCase() === req.query.type.toLowerCase()
            );
        }
        
        res.json(filteredShoes);
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });