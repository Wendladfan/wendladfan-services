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
    { author: 'Aicha K.', content: 'CV refait en 24h, j\'ai décroché un entretien ! Merci Wendladfan.', stars: 5 },
    { author: 'Ibrahim S.', content: 'Logo très professionnel pour ma boutique. Travail rapide et soigné.', stars: 5 },
    { author: 'Fatou O.', content: 'Mon mémoire était impeccable. Mise en page parfaite.', stars: 5 },
    { author: 'Moussa T.', content: 'Tableau Excel qui me fait gagner 3h par semaine. Excellent travail !', stars: 5 }
];

// ========== ROUTES ==========
app.get('/', (req, res) => {
    res.render('index', { projects, testimonials });
});

app.get('/bureautique', (req, res) => {
    res.render('bureautique');
});

app.get('/infographie', (req, res) => {
    res.render('infographie');
});

app.get('/packs', (req, res) => {
    res.render('packs');
});

app.get('/paiement', (req, res) => {
    res.render('paiement');
});

// ========== API ==========
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.get('/api/testimonials', (req, res) => {
    res.json(testimonials);
});

app.post('/api/quote', (req, res) => {
    const { name, phone, type, message } = req.body;
    console.log('📩 Nouveau devis:', { name, phone, type, message });
    res.json({ success: true });
});

app.post('/api/testimonials/add', (req, res) => {
    res.json({ success: true, message: 'Témoignage reçu !' });
});

// ========== DÉMARRAGE ==========
if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}`));
}
