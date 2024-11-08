const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  avatar: String,
  xp: Number,
  level: Number,
  imgProfil: String,
  friendlist: [],
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "badges" }],

  tasks: [
    {
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: "task" },
      counter: { type: Number, default: 0 },
    },
  ],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
