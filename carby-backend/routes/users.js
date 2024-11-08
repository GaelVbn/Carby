var express = require("express");
var router = express.Router();
require("../models/connection");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({
    username: { $regex: new RegExp(req.body.username, "i") },
  }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hash,
        xp: 0,
        level: 1,
        token: uid2(32),
      });

      newUser.save().then((newDoc) => {
        res.json({
          result: true,
          token: newDoc.token,
          username: newDoc.username,
          xp: newDoc.xp,
          lvl: newDoc.level,
          _id: newDoc._id,
        });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } }).then(
    (data) => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({
          result: true,
          token: data.token,
          email: data.email,
          xp: data.xp,
          lvl: data.level,
        });
      } else {
        res.json({ result: false, error: "User not found or wrong password" });
      }
    }
  );
});
//route PUT pour mettre à jour les tasks d'un utilisateur par son ID /// maj ajouter et supprimer taches
router.put("/initTasks/:token", (req, res) => {
  const token = req.params.token;
  const tasksId = req.body.tasksId.map((e) => ({ taskId: e }));
  User.findOne({ token })
    .then((user) => {
      User.findByIdAndUpdate(user._id, { tasks: tasksId }, { new: true })
        .populate("tasks")
        .then((updatedUser) => {
          if (!updatedUser) {
            return res
              .status(404)
              .json({ result: false, error: "User not found" });
          }
          res.json({
            result: true,
            tasks: updatedUser.tasks,
          });
        });
    })
    .catch((error) => {
      console.error("Error updating tasks:", error);
      res.status(500).json({ result: false, error: error.message });
    });
});

router.get("/tasks/:token", (req, res) => {
  const token = req.params.token;

  User.findOne({ token })
    .populate("tasks.taskId")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ result: false, error: "User not found" });
      }
      res.json({
        result: true,
        tasks: user.tasks,
      });
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ result: false, error: error.message });
    });
});

router.put("/lvl/:token", (req, res) => {
  const token = req.params.token;
  const lvlAdd = req.body.lvl;

  User.findOne({ token })
    .then((user) => {
      User.findByIdAndUpdate(user._id, { level: lvlAdd }, { new: true }).then(
        (updatedUser) => {
          if (!updatedUser) {
            return res
              .status(404)
              .json({ result: false, error: "User not found" });
          }
          res.json({
            result: true,
            lvl: updatedUser.level,
          });
        }
      );
    })
    .catch((error) => {
      console.error("Error updating level:", error);
      res.status(500).json({ result: false, error: error.message });
    });
});

router.put("/xp/:token", (req, res) => {
  const token = req.params.token;
  const xpAdd = req.body.xp;

  User.findOne({ token })
    .then((user) => {
      User.findByIdAndUpdate(user._id, { xp: xpAdd }, { new: true }).then(
        (updatedUser) => {
          if (!updatedUser) {
            return res
              .status(404)
              .json({ result: false, error: "User not found" });
          }
          res.json({
            result: true,
            xp: updatedUser.xp,
          });
        }
      );
    })
    .catch((error) => {
      console.error("Error updating xp:", error);
      res.status(500).json({ result: false, error: error.message });
    });
});
// Route PUT pour mettre à jour le compteur d'une tâche spécifique d'un utilisateur
router.put("/tasks/counter/:token", (req, res) => {
  const token = req.params.token;
  const { _id, counter } = req.body;

  User.findOne({ token }).then((user) => {
    const taskIndex = user.tasks.findIndex(
      (task) => task._id.toString() === _id
    );
    user.tasks[taskIndex].counter += counter;

    user.save().then((updatedUser) => {
      res.json({
        result: true,
        tasks: updatedUser.tasks,
      });
    });
  });
});
// route get pour lire la valeur d'un counter associé à une tache / user

// router.get("/tasks/counter/:token", (req, res) => {
//   const token = req.params.token;
//   const _id = req.params._id;
//   User.findOne({ token })

//     .then((user) => {
//       if (!user) {
//         return res
//           .status(404)
//           .json({ result: false, error: "user not found" });
//       }
//       res.json({
//         result: true,
//         tasks: user.tasks,
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching counter:", error);
//       res.status(500).json({ result: false, error: error.message });
//     });
// });
module.exports = router;
