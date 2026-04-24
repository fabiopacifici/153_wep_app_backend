const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController')
const upload = require('../middlewares/fileUpload')
router.get('/', bookController.index)


router.get('/:id', bookController.show)

router.post('/', upload.single('cover_image'), bookController.create)

// Store the book's review
router.post('/:id/review', bookController.storeReview)
module.exports = router;