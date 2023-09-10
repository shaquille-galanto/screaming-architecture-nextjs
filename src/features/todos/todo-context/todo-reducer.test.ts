import { todoReducer } from './todo-reducer'
import { TodoContextState, TodoReducerAction } from './types'

describe('todoReducer', () => {
  const state: TodoContextState = {
    todos: [{ id: 'todo-1', text: 'Test Todo', completed: false }],
  }

  it('should handle adding todo to state', () => {
    const action: TodoReducerAction = {
      type: 'ADD',
      payload: {
        id: 'todo-2',
        text: 'New Todo',
      },
    }

    const newState = todoReducer(state, action)

    expect(newState).toEqual({
      todos: [
        { id: 'todo-1', text: 'Test Todo', completed: false },
        { id: 'todo-2', text: 'New Todo', completed: false },
      ],
    })
  })

  it('should modify the existing todo in state', () => {
    const action: TodoReducerAction = {
      type: 'EDIT',
      payload: {
        todo: {
          id: 'todo-1',
          text: 'Edited Todo',
          completed: true,
        },
      },
    }

    const newState = todoReducer(state, action)

    expect(newState).toEqual({
      todos: [{ id: 'todo-1', text: 'Edited Todo', completed: true }],
    })
  })

  it('should delete an existing todo in state', () => {
    const action: TodoReducerAction = {
      type: 'DELETE',
      payload: {
        id: 'todo-1',
      },
    }

    const newState = todoReducer(state, action)

    expect(newState).toEqual({ todos: [] })
  })

  it('should handle invalid action type', () => {
    const action = {
      type: 'INVALID_ACTION_TYPE',
      payload: {},
    }

    const newState = todoReducer(state, action as TodoReducerAction)

    expect(newState).toEqual(state)
  })
})
