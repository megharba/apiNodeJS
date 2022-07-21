const path =require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const multer = require('multer');



const feedRoutes = require('./routes/feed');

const app = express();

const Produits = require('./models/produits');


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

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
  
mongoose.connect('mongodb+srv://root:root@cluster0.gslftzi.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => {
    console.log('Connexion à MongoDB réussie !')
    app.listen(8080);
})
.catch(() => console.log('Connexion à MongoDB échouée !'));


