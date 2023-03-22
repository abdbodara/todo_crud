const express = require("express");
const router = express.Router();

const {
  createTodo,
  getAllTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} = require("../controllers/todo");

router.route("/createtodo").post(createTodo);
router.route("/alltodo").get(getAllTodo);
router.route("/gettodo/:id").get(getTodo);
router.route("/updatetodo/:id").put(updateTodo);
router.route("/deletetodo/:id").delete(deleteTodo);

module.exports = router;
