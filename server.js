const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));
app.get('/bureautique', (req, res) => res.render('bureautique'));
app.get('/infographie', (req, res) => res.render('infographie'));
app.get('/packs', (req, res) => res.render('packs'));
app.get('/paiement', (req, res) => res.render('paiement'));

if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}`));
}
