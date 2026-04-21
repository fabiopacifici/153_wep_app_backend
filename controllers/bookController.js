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

module.exports = {
  index,
  show
}