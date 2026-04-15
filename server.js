const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Wendladfan Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, sans-serif; text-align: center; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #1a5f7a, #e67e22); color: white; padding: 20px; }
            h1 { font-size: 2.5rem; margin-bottom: 15px; }
            p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.95; }
            .btn { display: inline-block; background: white; color: #1a5f7a; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 1.2rem; box-shadow: 0 5px 20px rgba(0,0,0,0.2); margin: 10px; }
            .whatsapp { background: #25D366; color: white; }
            .contact { margin-top: 40px; }
            .contact p { margin-bottom: 10px; font-size: 1rem; }
        </style>
        </head>
        <body>
            <h1>✅ Wendladfan Services</h1>
            <p>Bureautique & Infographie au Burkina Faso</p>
            
            <a href="https://wa.me/22652580895" class="btn whatsapp">💬 Commander sur WhatsApp</a>
            
            <div class="contact">
                <p>📞 WhatsApp : +226 52 58 08 95</p>
                <p>📞 Orange : +226 77 20 82 48</p>
                <p>📞 Moov : +226 52 58 08 95</p>
                <p>✉️ wendladfanservices@gmail.com</p>
                <p style="margin-top: 20px;">📍 Ouagadougou, Burkina Faso</p>
                <p style="margin-top: 30px; font-size: 0.9rem;">© 2026 Wendladfan Services - "Wend na kond laafy"</p>
            </div>
        </body>
        </html>
    `);
});

app.get('/paiement', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Paiement - Wendladfan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { font-family: sans-serif; padding: 20px; text-align: center; background: #f5f5f5; }
            .card { background: white; padding: 30px; border-radius: 16px; max-width: 400px; margin: 0 auto; }
            h2 { color: #1a5f7a; }
            .num { font-size: 2rem; font-weight: bold; color: #1a5f7a; margin: 10px 0 20px; }
            .btn { display: inline-block; background: #25D366; color: white; padding: 15px 30px; border-radius: 30px; text-decoration: none; margin-top: 20px; }
        </style>
        </head>
        <body>
            <div class="card">
                <h2>💰 Paiement</h2>
                <p><strong>🟠 Orange Money</strong></p><div class="num">77 20 82 48</div>
                <p><strong>🔵 Moov Money</strong></p><div class="num">52 58 08 95</div>
                <p><strong>🌊 Wave</strong></p><div class="num">77 20 82 48</div>
                <p>Envoyez la capture du paiement sur WhatsApp</p>
                <a href="https://wa.me/22652580895" class="btn">📱 Envoyer la capture</a>
                <p style="margin-top:20px;"><a href="/">← Retour</a></p>
            </div>
        </body>
        </html>
    `);
});

if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(3000, () => console.log('✅ http://localhost:3000'));
}
