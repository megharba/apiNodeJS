const express = require('express');
const Produits = require('../models/produits');

const feedController = require('../controllers/feed');

const router = express.Router();
const { body } = require('express-validator/check');
const path = require('path');

const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    console.log('file: ', file)
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({storage: fileStorage })


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
  ],  upload.single('file'),
  feedController.createProduit);
// POST /feed/post
//router.post('/produits', feedController.createProduits);
router.get('/produit/:produitId', feedController.getProduit);


router.put(
    '/produit/edit/:produitId',
    [
      body('title')
        .trim()
        .isLength({ min: 5 }),
      body('content')
        .trim()
        .isLength({ min: 5 })
    ],upload.single('file'),
    feedController.updatePost
  );
// router.post('/img',upload.single('file'), feedController.getImg);

router.delete('/produit/delete/:produitId', feedController.deleteProduit);

module.exports = router;