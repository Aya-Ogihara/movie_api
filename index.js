const express = require('express'),
morgan = require('morgan'),
fs = require('fs');

const app = express();

//myMovie info
let myMovie = [
  {
    title: 'BREAKFAST AT TIFFANY\'S',
    year: 1961,
    genre: ['Comedy', 'Romance', 'Drama'],
    director: 'Blake Edwards'
  },
  {
    title: 'ROMAN HOLIDAY',
    year: 1953,
    genre: ['Comedy ', 'Romance'],
    director: 'William Wyler'
  }, 
  {
    title: 'SABRINA ',
    year: 1954,
    genre: ['Comedy', 'Romance', 'Drama'],
    director: 'Billy Wilder'
  },
  {
    title: 'CHARADE ',
    year: 1963,
    genre: ['Mystery', 'Romance', 'Drama'],
    director: 'Stanley Donen'
  },
  {
    title: 'MY FAIR LADY',
    year: 1964,
    genre: 'Musical',
    director: 'George Cukor'
  },
  {
    title: 'FUNNY FACE',
    year: 1957,
    genre: ['musical', 'Romance', 'Drama'],
    director: 'Stanley Donen'
  },
  {
    title: 'TWO FOR THE ROAD',
    year: 1967,
    genre: ['Comedy', 'Romance', 'Drama'],
    director: 'Stanley Donen.'
  },
  {
    title: 'THE NUN’S STORY',
    year: 1959,
    genre: 'Drama',
    director: 'Fred Zinnemann'
  },
  {
    title: 'WAIT UNTIL DARK',
    year: 1967,
    genre: ['Horror', 'Thriller', 'Suspense', 'Drama'],
    director: 'Terence Young'
  },
  {
    title: 'LOVE IN THE AFTERNOON ',
    year: 1957,
    genre: ['Comedy', 'Romance', 'Drama'],
    director: 'Billy Wilder'
  } 
];
//myMovie info end 

// Log all requests to log.txt
app.use(morgan('common', {
  stream: fs.createWriteStream('./log.txt', {flags: 'a'})
}));
// Log all requests to console
app.use(morgan('common'));

// Get requests
app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.get('/movies', (req, res) => {
  res.json(myMovie);
});

// Serving static files
app.use(express.static('public',{extensions:['html']}));

// Error handling  
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.stats(500).send('Sorry, something went wrong...');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.')
});