const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: ["true", "The todo text field is required"],
  },
});

module.exports = mongoose.model("todo", TodoSchema);
