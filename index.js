const express = require('express'),
morgan = require('morgan');

const app = express();

app.use(morgan('common'));

//myMovie info
let myMovie = [
  {
    title: 'test1',
    year: 2001
  },  {
    title: 'test2',
    year: 2002
  },
]

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.get('/movie', (req, res) => {
  res.json(myMovie);
});

// Serving static files
app.use(express.static('public'));

// Error handling  
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.stats(500).send('Sorry, something went wrong...');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.')
});