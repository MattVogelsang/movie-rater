const router = require('express').Router();
const { User, Comment, Movie } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
        res.redirect('/login');
      return;
    }
  res.render("homepage", {logged_in: req.session.logged_in})
  });

  router.get('/index', withAuth, (req, res) => {
    res.render('index', { movies: req.session.results });
  });


// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// Profile route
router.get('/profile', withAuth, async (req, res) => {
    try{
        const userData= await User.findByPk(req.session.user_id, {
            include: Comment
        })
        let selectedUser= userData.get({plain:true})
        console.log(selectedUser) 
        console.log(req.session.movie)
        res.render('profile', {...selectedUser, logged_in: req.session.logged_in, movie:req.session.movie})
    }
    catch(err){
        return res.status(500).json(err)
    }
});

module.exports = router;
