const express = require('express');
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

if (!fs.existsSync('./database')) fs.mkdirSync('./database');
const dbPath = path.join(__dirname, 'database', 'wendladfan.db');
let db;

async function initDB() {
    const SQL = await initSqlJs();
    db = fs.existsSync(dbPath) ? new SQL.Database(fs.readFileSync(dbPath)) : new SQL.Database();
    
    db.run(`CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        description TEXT,
        media_type TEXT DEFAULT 'image',
        media_url TEXT,
        image_color TEXT
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT,
        content TEXT,
        stars INTEGER DEFAULT 5
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        type TEXT,
        service TEXT,
        details TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    const check = db.exec('SELECT COUNT(*) FROM projects');
    if (check[0].values[0][0] === 0) {
        db.run(`INSERT INTO projects (title, category, image_color) VALUES ('CV Professionnel', 'bureautique', '#1a5f7a')`);
        db.run(`INSERT INTO projects (title, category, image_color) VALUES ('Logo Startup', 'infographie', '#e67e22')`);
    }
    
    const checkT = db.exec('SELECT COUNT(*) FROM testimonials');
    if (checkT[0].values[0][0] === 0) {
        db.run(`INSERT INTO testimonials (author, content, stars) VALUES ('Aicha K.', 'Excellent travail !', 5)`);
    }
    
    saveDB();
    console.log('✅ Base OK');
}

function saveDB() { fs.writeFileSync(dbPath, Buffer.from(db.export())); }

// ========== ROUTES ==========
app.get('/', (req, res) => res.render('index'));
app.get('/bureautique', (req, res) => res.render('bureautique'));
app.get('/infographie', (req, res) => res.render('infographie'));
app.get('/packs', (req, res) => res.render('packs'));
app.get('/paiement', (req, res) => res.render('paiement'));

app.get('/api/projects', (req, res) => { const r = db.exec('SELECT * FROM projects ORDER BY id DESC'); res.json(r.length ? r[0].values : []); });
app.post('/api/projects/add', (req, res) => { const { title, category, description, media_type, media_url, image_color } = req.body; db.run('INSERT INTO projects (title, category, description, media_type, media_url, image_color) VALUES (?, ?, ?, ?, ?, ?)', [title, category, description, media_type || 'image', media_url || '', image_color || '#1a5f7a']); saveDB(); res.json({ success: true }); });
app.post('/api/projects/delete', (req, res) => { db.run('DELETE FROM projects WHERE id = ?', [req.body.id]); saveDB(); res.json({ success: true }); });

app.get('/api/testimonials', (req, res) => { const r = db.exec('SELECT * FROM testimonials'); res.json(r.length ? r[0].values : []); });
app.post('/api/testimonials/add', (req, res) => { const { author, content, stars } = req.body; db.run('INSERT INTO testimonials (author, content, stars) VALUES (?, ?, ?)', [author, content, stars||5]); saveDB(); res.json({ success: true }); });

app.post('/api/quote', (req, res) => { const { name, phone, type, service, details, message } = req.body; db.run('INSERT INTO quotes (name, phone, type, service, details, message) VALUES (?, ?, ?, ?, ?, ?)', [name, phone, type, service, details, message]); saveDB(); res.json({ success: true }); });

initDB().then(() => app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}`)));
