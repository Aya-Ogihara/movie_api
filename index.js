const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// import 'model.js' file
const Models = require('./models.js');
const Movies = Models.Movie;
const Genres = Models.Genre;
const Directors = Models.Director;
const Actors = Models.Actor;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, UseUnifiedTopology: true});

const app = express();

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import 'auth.js' file 
const auth = require('./auth')(app);

// import 'passport.js' file
const passport = require('passport');
require = ('./passport');

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
  Movies.find().populate('Genre').populate('Director').populate('Actors')
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: &{err}`);
    });
});

// Return data about a single movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title }).populate('Genre').populate('Director').populate('Actors')
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  })
});

// Return a list of all genres
app.get('/genres', (req, res) => {
  Genres.find()
  .then((genres) => {
    res.status(201).json(genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(`Error: &{err}`);
  });
});

// Return data about a genre by name
app.get('/genres/:Name', (req, res) => {
  Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  })
});

// Return a list of all directors
app.get('/directors', (req, res) => {
  Directors.find()
  .then((directors) => {
    res.status(201).json(directors);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(`Error: &{err}`);
  });
});

// Return data about a director by name
app.get('/directors/:Name', (req, res) => {
  Directors.findOne({ Name: req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  })
});

// Return a list of all actors
app.get('/actors', (req, res) => {
  Actors.find()
  .then((actors) => {
    res.status(201).json(actors);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(`Error: &{err}`);
  });
});

// Return data about a actor by name
app.get('/actors/:Name', (req, res) => {
  Actors.findOne({ Name: req.params.Name })
  .then((actor) => {
    res.json(actor);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  })
});


/*======
Users requests 
======*/

//Add a user
/* Required format in JSON 
{
  ID: Integer, (system generated)
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
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
            Password: req.body.Password,
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

// Allow users to update their user info by username
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set: 
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true },
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username}, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow existing users to deregister
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(`${req.params.Username} was not found.`);
      } else {
        res.status(200).send(`${req.params.Username} was deleted.`);
      }
    })
    .catch((err) =>{
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

/*======
All requests end 
======*/

// Serving static files
app.use(express.static('public',{extensions:['html']}));

// Error handling  
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Sorry, something went wrong...');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.')
});