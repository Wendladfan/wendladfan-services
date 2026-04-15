const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Wendladfan Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { font-family: sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #1a5f7a, #e67e22); color: white; }
            h1 { font-size: 2rem; }
            .btn { display: inline-block; background: white; color: #1a5f7a; padding: 15px 30px; border-radius: 50px; text-decoration: none; margin-top: 20px; }
        </style>
        </head>
        <body>
            <h1>✅ Wendladfan Services</h1>
            <p>Bureautique & Infographie au Burkina Faso</p>
            <p>📞 WhatsApp : +226 52 58 08 95</p>
            <a href="https://wa.me/22652580895" class="btn">💬 Commander sur WhatsApp</a>
        </body>
        </html>
    `);
});

if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(3000, () => console.log('✅ http://localhost:3000'));
}
