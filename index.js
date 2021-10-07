const express = require('express'),
morgan = require('morgan');

const app = express();

app.use(morgan('common'));

//myMovie info
let myMovie = [
  {
    title: 'BREAKFAST AT TIFFANY\'S',
    year: 1961
  },
  {
    title: 'ROMAN HOLIDAY',
    year: 1953
  }, 
  {
    title: 'SABRINA ',
    year: 1954
  },
  {
    title: 'CHARADE ',
    year: 1963
  },
  {
    title: 'MY FAIR LADY',
    year: 1964
  },
  {
    title: 'FUNNY FACE',
    year: 1957
  },
  {
    title: 'TWO FOR THE ROAD',
    year: 1967
  },
  {
    title: 'THE NUN’S STORY',
    year: 1959
  },
  {
    title: 'WAIT UNTIL DARK',
    year: 1967
  },
  {
    title: 'LOVE IN THE AFTERNOON ',
    year: 1957
  } 
]
//myMovie info end 

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