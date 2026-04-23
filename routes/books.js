const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController')

router.get('/', bookController.index)


router.get('/:id', bookController.show)

router.post('/', bookController.create)

// Store the book's review
router.post('/:id/review', bookController.storeReview)
module.exports = router;