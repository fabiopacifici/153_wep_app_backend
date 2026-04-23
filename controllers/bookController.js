const connection = require('../database/connection')


// Index
const index = (req, res) => {

  // prepare the sql query
  const sql = 'SELECT * FROM books'

  // execute the sql query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results)
  })
}


// Show
const show = (req, res) => {

  // prepare the sql query
  const sql = 'SELECT * FROM books WHERE id = ?'
  const id = Number(req.params.id)
  // prepare the query to get all reviews for the book
  const reviewSql = 'SELECT * FROM reviews WHERE book_id = ?'


  // execute the sql query
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // execute the query to get all reviews for the book
    connection.query(reviewSql, [id], (err, reviewResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      // add the reviews to the book object
      results[0].reviews = reviewResults

      res.json(results[0])
    })

  })
}

// Create
const create = (req, res) => {
  const { title, plot, cover_image, author, year } = req.body
  // prepare the sql query
  const sql = 'INSERT INTO books (title, plot, cover_image, author, year) VALUES (?, ?, ?, ?, ?)'
  // execute the sql query
  connection.query(sql, [title, plot, cover_image, author, year], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(201).json({ message: 'Book created successfully', bookId: results.insertId });
  })
}


// Store review
const storeReview = (req, res) => {
  const bookId = Number(req.params.id)
  const { username, vote, content } = req.body

  console.log('Received review:', { bookId, username, vote, content });

  // Validate the input
  if (!username || !vote || !content) {
    return res.status(400).json({ error: 'Missing required fields: username, vote, content' });
  }



  // Prepare the SQL query to insert the review
  const sql = 'INSERT INTO reviews (book_id, username, vote, content) VALUES (?, ?, ?, ?)'

  // Execute the SQL query
  connection.query(sql, [bookId, username, vote, content], (err, results) => {
    // console.log(results, err);
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(201).json({ message: 'Review added successfully', reviewId: results.insertId });
  });
}

module.exports = {
  index,
  show,
  create,
  storeReview
}