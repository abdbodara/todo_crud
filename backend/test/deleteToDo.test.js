const assert = require('assert');
const { deleteTodo } = require('../controllers/todo');
const Todo = require('../model/TodoSchema');

describe('deleteTodo', () => {
    it('deletes a todo', async () => {
        const req = {
            params: {
                _id: '1234'
            }
        };
        const res = {
            json: (result) => {
                assert.deepEqual(result, { msg: 'task deleted with this id : 1234' });
            }
        };

        await deleteTodo(req, res);
    });

    it('should return error when todo is not found', async () => {
        const req = {
            params: {
                _id: '5678'
            }
        };
        const res = {
            json: (result) => {
                assert.deepEqual(result, { msg: 'no task with id : 5678' });
            }
        };

        Todo.findOne = (query) => Promise.resolve(null);

        await deleteTodo(req, res);
    });


    it('handles errors when deleting a todo', async () => {
        const req = {
            params: {
                _id: '1234'
            }
        };
        const res = {
            json: (result) => { 
                assert.deepEqual(result, { msg: 'no task with id : 1234 ' });
            }
        };

        Todo.findOne = (query) => Promise.reject({ error: 'Error finding todo' });

        await deleteTodo(req, res);
    });
});
