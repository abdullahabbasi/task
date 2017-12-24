import { ADD_TODO, DELETE_TODO, EDIT_TODO, GET_TODO_LIST } from '../constants/ActionTypes'

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      let stateList = _.values(state)

      return [
        {
          created_at: Date.now().toString(),
          task_title: '',
          newTask: true
        },
        ...stateList
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.created_at !== action.createdAt
      )

    case EDIT_TODO:
      const taskList = _.values(state)
      return taskList.map(todo => {
        if (todo.created_at === action.createdAt) {
          return { ...todo, task_title: action.text, newTask: false }
        } else {
          return todo
        }
      })

    case GET_TODO_LIST:
      return action.todos

    default:
      return state
  }
}
