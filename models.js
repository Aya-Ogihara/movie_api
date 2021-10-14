const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'},
  Director: {type: mongoose.Schema.Types.ObjectId, ref: 'Director'},
  Actors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Actor'}],
  ImagePath: String,
  Featured: Boolean
});

const genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true}
});

const directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birth: {type: String, required: true},
  Death: String
});

const actorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birth: {type: String, required: true},
  Death: String
});

const userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

const Movie = mongoose.model('Movie', movieSchema);
const Genre = mongoose.model('Genre', genreSchema);
const Director = mongoose.model('Director', directorSchema);
const Actor = mongoose.model('Actor', actorSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.Actor = Actor;
module.exports.User = User;