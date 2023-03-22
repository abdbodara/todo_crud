const assert = require('assert');
const { updateTodo } = require('../controllers/todo');
const Todo = require('../model/TodoSchema');

describe('updateTodo', () => {
    it('should update a todo by id', async () => {
        const req = {
            params: {
                id: '63e4d353dfaebf12f091e806'
            },
            body: {
                task: 'todo 1 updated'
            }
        };
        const res = {
            status: (statusCode) => {
                assert.equal(statusCode, 200);
                return {
                    send: (result) => {
                        assert.deepEqual(result, { msg: `task is updated Successful` });
                    }
                }
            }
        };

        Todo.findOneAndUpdate = (query, update, options) => Promise.resolve({ _id: '1234', task: 'todo 1 updated' });

        await updateTodo(req, res);
    });

    it('should return error when todo is not found', async () => {
        const req = {
            params: {
                id: '5678'
            },
            body: {
                task: 'todo 2 updated'
            }
        };
        const res = {
            status: (statusCode) => {
                assert.equal(statusCode, 404);
                return {
                    send: (result) => {
                        assert.deepEqual(result, { msg: 'no task with id : 5678' });
                    }
                }
            }
        };

        Todo.findOneAndUpdate = (query, update, options) => Promise.resolve(null);

        await updateTodo(req, res);
    });

    it('should return error when updating todo fails', async () => {
        const req = {
            params: {
                id: '1234'
            },
            body: {
                task: 'todo 1 updated'
            }
        };
        const res = {
            status: (statusCode) => {
                assert.equal(statusCode, 404);
                return {
                    send: (err) => {
                        assert.deepEqual(err, { error: 'Error updating todo' });
                    }
                }
            }
        };

        Todo.findOneAndUpdate = (query, update, options) => Promise.reject({ error: 'Error updating todo' });

        await updateTodo(req, res);
    });
});
