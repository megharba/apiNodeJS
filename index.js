/**
 * app.js
 * 
 * Point d'entrée de l'application
 */

 const path =require('path');
 // Installation d'Express
 const express = require('express');
 const bodyParser = require('body-parser');
 // Configuration de la base de données
 const mongoose = require('mongoose');
 
 // Configuration du middleware de gestion des fichiers
 const multer = require('multer');
 
 
 
 const feedRoutes = require('./routes/feed');
 const authRoutes = require('./routes/auth');
 const app = express();
 
 const Produits = require('./models/produits');
 require('dotenv').config({ debug: true, override: false })
 
 
 
 // Ajout des middlewares (série de fonctions)
 app.use(bodyParser.json()); // application/json
 
 
 // Ajout de la fonction permettant d'éviter les erreurs de CORS (Cross Origin Resource Sharing)
 app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     next();
 });
 
 app.use('/feed', feedRoutes);
 app.use('/auth', authRoutes);
 
 // app.post('/test', upload.single('file'), (req, res) => {
 //     console.log(req.file)
 //     res.send('ok')
 // })
 
 app.use((error, req, res, next) => {
     console.log(error);
     const status = error.statusCode || 500;
     const message = error.message;
     res.status(status).json({ message: message });
   });
 // Connexion de l'API au cluster MongoDB
 mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,
 useUnifiedTopology: true })
 .then(() => {
     console.log('Connexion à MongoDB réussie !')
     app.listen(8080);
 })
 .catch(() => console.log('Connexion à MongoDB échouée !'));
 
 
 