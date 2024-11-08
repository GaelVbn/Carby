var express = require("express");
var router = express.Router();
require("../models/connection");
const Task = require("../models/tasks");

router.post("/add", (req, res) => {
  const { title, description, img } = req.body;

  Task.findOne({ title: title })
    .then((existingTask) => {
      if (existingTask) {
        return res.json({ result: false, error: "Task already exists" });
      }

      const newTask = new Task({
        title: title,
        description: description,
        img: img,
      });

      newTask
        .save()
        .then((newDoc) => {
          res.json({
            result: true,
            title: newDoc.title,
            description: newDoc.description,
            img: newDoc.img,
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

router.get("/", (req, res) => {
  Task.find().then((data) => {
    res.json({
      result: true,

      tasks: data,
    });
  });
});

module.exports = router;
