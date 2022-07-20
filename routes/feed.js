const express = require('express');
const Produits = require('../models/produits');

const feedController = require('../controllers/feed');

const router = express.Router();
const { body } = require('express-validator/check');
// GET /feed/produits
router.get('/produits',feedController.getProduits);
router.post(
    '/produit',
[
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],  
  feedController.createProduit);
// POST /feed/post
//router.post('/produits', feedController.createProduits);
router.get('/produit/:produitId', feedController.getProduit);

module.exports = router;