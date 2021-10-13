const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, UseUnifiedTopology: true});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


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

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username})
    .then((user) => {
      if (user) {
        return res.status(400).send(`${req.body.Username} already exists`);
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Pass,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => {res.status(201).json(user)})
        .catch((error) => {
          console.error(error);
          res.status(500).send(`Error: ${error}`);
        })  
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(`Error: ${error}`);
    })
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