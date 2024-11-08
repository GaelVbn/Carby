var express = require('express');
var router = express.Router();
require('../models/connection');
/* GET home page. */

const NEWS_API_KEY = process.env.NEWS_API_KEY;
router.get('/articles', (req, res) => {
    fetch(`https://newsapi.org/v2/everything?q=écologie OR écoresponsabilité OR recyclage OR "développement durable" OR "zéro déchet" OR "énergie renouvelable"&language=fr&apiKey=${NEWS_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.articles) { 
          res.json({ articles: data.articles });
        } else {
          res.json({ articles: [] });
        }
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        res.json({ articles: [] });
      });
  });
module.exports = router;
