const express = require('express'),
morgan = require('morgan'),
fs = require('fs');

const app = express();

//movies info
let movies = [
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
    title: 'SABRINA',
    year: 1954,
    genre: ['Comedy', 'Romance', 'Drama'],
    director: 'Billy Wilder'
  },
  {
    title: 'CHARADE',
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
//movies info end 

// Log all requests to log.txt
app.use(morgan('common', {
  stream: fs.createWriteStream('./log.txt', {flags: 'a'})
}));
// Log all requests to console
app.use(morgan('common'));

/*======
Movies requests 
======*/

// Get requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix app!');
});

// Return a list of all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Return data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) => {
    return movie.title === req.params.title
  }));
});

// Return data about a genre by title
app.get('/movies/genres/:title', (req, res) => {
  res.send('Return genre.');
});

// Return data about a director by name
app.get('/movies/directors/:name', (req, res) => {
  res.send('Return the director\'s information.');
});

/*======
Users requests 
======*/

// Allow new users to register
app.post('/users', (req, res) => {
  res.send('Return the new registered user info');
});

// Allow users to update their user info
app.put('/users/:username', (req, res) => {
  res.send('Return the updated user info');
});

// Allow users to add a movie to their list of favorites
app.post('/users/:username/favorites', (req, res) => {
  res.send('The movie has been added to your favorite list');
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:username/favorites/:movieId', (req, res) => {
  res.send('The movie has been removed from your favorite list');
});
// Allow existing users to deregister
app.delete('/users/:username', (req, res) => {
  res.send('The user has been removed from the app');
});

/*======
All requests end 
======*/

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