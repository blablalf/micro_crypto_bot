// Charge le module HTTP
const express = require('express');
const app = express();
const port = 3000;

// Database connection
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(__dirname + '/database.db');

// Get all prices from last 24 hours
app.get('/prices', (req, res) => {
    db.all(`SELECT * FROM prices WHERE date >= date('now', '-1 days')`, (err, rows) => {
        if (err) throw err;
        // Return the web pages result
        res.json({ prices: rows });
    });
});

// Get all prices from last 24 hours for a specific pair
app.get('/prices/:asset1-:asset2', (req, res) => {
    const pair = req.params.asset1 + '-' + req.params.asset2;
    db.all(`SELECT * FROM prices WHERE date >= date('now', '-1 days') AND peer == '` + pair + `'`, (err, rows) => {
        if (err) throw err;
        // Return the web pages result
        res.json({ prices: rows });
    });
});

// Get average price for a specific pair into the last 24 hours
app.get('/average/:asset1-:asset2', (req, res) => {
    const pair = req.params.asset1 + '-' + req.params.asset2;
    db.all(`SELECT AVG(price) as average_price FROM prices WHERE date >= date('now', '-1 days') AND peer == '` + pair + `'`, (err, rows) => {
        if (err) throw err;
        // Return the web pages result
        res.json(rows.at(0));
    });
});

app.get('/', (req, res) => {
    res.status(200).send('OK');
}); 

app.use(function(err, _, res, _) {
    console.error(err.stack);
    res.status(500).send("Quelque chose s'est cassé !");
});


app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`)
});