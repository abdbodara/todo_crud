const assert = require('assert');
const { getAllTodo } = require('../controllers/todo');
const Todo = require('../model/TodoSchema');


describe('getAllTodo', () => {
    it('should return all todos', async () => {
        const req = {};
        const res = {
            status: (statusCode) => {
                assert.equal(statusCode, 200);
                return {
                    json: (todos) => {
                        assert.deepEqual(todos, [{title: 'todo 1'}, {title: 'todo 2'}]);
                    }
                }
            }
        };

        Todo.find = (query) => Promise.resolve([{title: 'todo 1'}, {title: 'todo 2'}]);

        await getAllTodo(req, res);
    });

    it('should return error when finding todos fails', async () => {
        const req = {};
        const res = {
            status: (statusCode) => {
                assert.equal(statusCode, 404);
                return {
                    json: (err) => {
                        assert.deepEqual(err, {error: 'Error finding todos'});
                    }
                }
            }
        };

        Todo.find = (query) => Promise.reject({error: 'Error finding todos'});

        await getAllTodo(req, res);
    });
});
