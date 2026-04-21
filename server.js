const express = require('express');
const app = express();
const bookRouter = require('./routes/books')
const serverError = require('./middlewares/serverError')
const notFound = require('./middlewares/notFound')

const PORT = process.env.PORT || 3000

// register the static middleware
app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);

})

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the books review API SERVER '
  })
})

// register the books router 
app.use('/api/books', bookRouter)



// handle server errors with a middleware
app.use(serverError);




// handle 404 errors with a middleware
app.use(notFound);
