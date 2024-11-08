var express = require("express");
var router = express.Router();

const User = require("../models/users");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
  if (!checkBody(req.body, ["token", "content"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ token: req.body.token }).then((user) => {
    if (user === null) {
      res.json({ result: false, error: "User not found" });
      return;
    }

    const newTweet = new Tweet({
      author: user.username,
      content: req.body.content,
      photoProfile: user.avatar,
      createdAt: new Date(),
    });

    newTweet.save().then((newDoc) => {
      res.json({ result: true, tweet: newDoc });
    });
  });
});

router.get("/all/:token", (req, res) => {
  User.findOne({ token: req.params.token })
    .then((user) => {
      if (!user) {
        return res.json({ result: false, error: "User not found" });
      }
      Tweet.find()
        .sort({ createdAt: "desc" })
        .then((tweets) => {
          res.json({ result: true, tweets });
        })
        .catch((error) => {
          res.json({
            result: false,
            error: "Error fetching tweets",
            details: error,
          });
        });
    })
    .catch((error) => {
      res.json({ result: false, error: "Error finding user", details: error });
    });
});

module.exports = router;
