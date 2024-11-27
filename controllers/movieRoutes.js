const axios = require('axios');
const { Movie } = require('../models');
const router= require('express').Router();
require('dotenv').config();

router.get('/', async (req, res) => {
  const {q}= req.query
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${q}&api_key=${process.env.TMDB_API_KEY}`
  );
  console.log(response.data.results)
  req.session.save(() => {
    req.session.results = response.data.results;
    res.status(200).json({message: "success"});
  });
});

router.get('/:id', async (req, res) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`
  );
  console.log(response)
  const movie = response.data;
  req.session.save(()=>{
    req.session.movie=movie
    console.log(movie)
  res.render('movie', { movie });
  })
  
});

module.exports = router;