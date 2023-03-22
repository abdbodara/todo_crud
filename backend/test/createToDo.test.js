const { createTodo } = require("../controllers/todo");
const TodoSchema = require("../model/TodoSchema");
jest.mock('../model/TodoSchema');


describe('createTodo', () => {
  let req, res

  beforeEach(() => {
    req = {
      body: {
        task: {
          task: 'Example task'
        }
      }
    }

    res = {
      status: jest.fn().mockReturnValue({
        json: jest.fn()
      })
    }

    jest.clearAllMocks()
    jest.spyOn(TodoSchema, 'create').mockImplementation(() => Promise.resolve({ _id: '123' }))
  })

  it('creates a todo successfully when todo passed', async () => {
    await createTodo(req, res)

    expect(TodoSchema.create).toHaveBeenCalledWith({ task: 'Example task' })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.status().json).toHaveBeenCalledWith({ status: 'success', todo: { _id: '123' } })
  })

  it('returns an error when no todo passed', async () => {
    req.body.task.task = null

    await createTodo(req, res)

    expect(TodoSchema.create).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status().json).toHaveBeenCalledWith({ error: 'No todo passed' })
  })

  it('handles errors', async () => {
    jest.spyOn(TodoSchema, 'create').mockImplementation(() => Promise.reject({}))

    await createTodo(req, res)

    expect(TodoSchema.create).toHaveBeenCalledWith({ task: 'Example task' })
    expect(res.status).toHaveBeenCalledWith(404)
  })
})
