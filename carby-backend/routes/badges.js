var express = require("express");
var router = express.Router();
require("../models/connection");
const Badges = require("../models/badges");

/* GET home page. */
router.get("/", (req, res) => {
  Badges.find().then((data) => {
    res.json({
      result: true,

      badges: data,
    });
  });
});

router.post("/addBadge", async (req, res) => {
  const { title, img, xp, category } = req.body;

  Badges.findOne({ title: title })
    .then((existingBadge) => {
      if (existingBadge) {
        return res.json({ result: false, error: "Badge already exists" });
      }

      const newBadges = new Badges({
        title: title,
        img: img,
        xp: xp,
        category: category,
      });

      newBadges
        .save()
        .then((newDoc) => {
          res.json({
            result: true,
            badge: newDoc,
          });
        })
        .catch((err) => {
          res.status(500).json({ result: false, error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ result: false, error: err.message });
    });
});

module.exports = router;
