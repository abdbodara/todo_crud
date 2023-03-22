const Todo = require('../model/TodoSchema')

// create Todo
const createTodo = async (req, res) => {
    try {
        const { task: { task } } = req.body
        if (task) {
            const todo = await Todo.create({ task })
            return res.status(201).json({ status: 'success', todo })
        } else {
            return res.status(400).json({ error: 'No todo passed' })
        }
    }
    catch (err) {
        res.status(404).json(err)
    }
}

// get All Todo
const getAllTodo = async (req, res) => {
    try {
        const todo = await Todo.find()
        res.status(200).json(todo)
    } catch (err) {
        console.log("Something Went Wrong");
        res.status(404).json(err)
    }
}

// get singel Todo
const getTodo = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Todo.findOne({ _id: taskID });
        if (!task) {
            return res.json({ msg: `no task with id : ${taskID}` })
        }
        res.json(task)
    } catch (err) {
   res.status(404).json(err)
    }
}

// update Todo
const updateTodo = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Todo.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send({ msg: `no task with id : ${taskID}` })
        }
        res.status(200).send({ msg: `task is updated Successful` })
    }
    catch (err) {
        res.status(404).send({ error: 'Error updating todo' })
    }
}

// delete Todo
const deleteTodo = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Todo.findByIdAndDelete({ _id: taskID });
        if (!task) {
            return res.json({ msg: `no task with id : ${taskID}` })
        }
        res.json({ msg: `task deleted with this id : ${taskID}` });
    } catch (err) {
        console.log("Something Went Wrong");
    }
};

module.exports = {
    createTodo,
    getAllTodo,
    updateTodo,
    getTodo,
    deleteTodo
}