const assert = require('assert');
const { getTodo } = require('../controllers/todo');
const Todo = require('../model/TodoSchema');

describe('getTodo', () => {
    it('should return a todo by id', async () => {
        const req = {
            params: {
                id: '1234'
            }
        };
        const res = {
            json: (todo) => {
                assert.deepEqual(todo, {_id: '1234', task: 'todo 1'});
            }
        };

        Todo.findOne = (query) => Promise.resolve({_id: '1234', task: 'todo 1'});

        await getTodo(req, res);
    });

    it('should return error when todo is not found', async () => {
        const req = {
            params: {
                id: '5678'
            }
        };
        const res = {
            json: (result) => {
                assert.deepEqual(result, { msg: 'no task with id : 5678' });
            }
        };

        Todo.findOne = (query) => Promise.resolve(null);

        await getTodo(req, res);
    });

    it('should return error when finding todo fails', async () => {
        const req = {
            params: {
                id: '1234'
            }
        };
        const res = {
            status: (statusCode) => {
                assert.equal(statusCode, 404);
                return {
                    json: (err) => {
                        assert.deepEqual(err, {error: 'Error finding todo'});
                    }
                }
            }
        };

        Todo.findOne = (query) => Promise.reject({error: 'Error finding todo'});

        await getTodo(req, res);
    });
});
