import * as types from '../constants/ActionTypes'

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = createdAt => ({ type: types.DELETE_TODO, createdAt })
export const editTodo = (createdAt, text) => ({ type: types.EDIT_TODO, createdAt, text })
export const getTodoList = (todos) => ({ type: types.GET_TODO_LIST, todos })
