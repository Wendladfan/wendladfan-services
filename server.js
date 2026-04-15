const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Données en dur
const projects = [
    { id: 1, title: 'CV Professionnel', category: 'bureautique', image_color: '#1a5f7a' },
    { id: 2, title: 'Logo Startup', category: 'infographie', image_color: '#e67e22' },
    { id: 3, title: 'Tableau de Bord Excel', category: 'bureautique', image_color: '#27ae60' },
    { id: 4, title: 'Affiche Mariage', category: 'infographie', image_color: '#8e44ad' }
];

const testimonials = [
    { author: 'Aicha K.', content: 'CV refait en 24h, excellent service !', stars: 5 },
    { author: 'Ibrahim S.', content: 'Logo très professionnel, je recommande !', stars: 5 },
    { author: 'Fatou O.', content: 'Mémoire impeccable, mise en page parfaite.', stars: 5 }
];

// Routes
app.get('/', (req, res) => res.render('index', { projects, testimonials }));
app.get('/bureautique', (req, res) => res.render('bureautique'));
app.get('/infographie', (req, res) => res.render('infographie'));
app.get('/packs', (req, res) => res.render('packs'));
app.get('/paiement', (req, res) => res.render('paiement'));

app.get('/api/projects', (req, res) => res.json(projects));
app.get('/api/testimonials', (req, res) => res.json(testimonials));

app.post('/api/quote', (req, res) => res.json({ success: true }));

if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}`));
}
