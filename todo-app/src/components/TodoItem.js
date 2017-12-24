import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  deleteTask () {
    this.props.actions.deleteTodo(this.props.item.created_at)
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  render () {
    const { item, actions } = this.props
    return (
      <div className='task'>
        <div className='task-container'>
          <TodoTextInput text={this.props.item.task_title}
            createdAt={this.props.item.created_at}
            newTask={this.props.item.newTask}
            editing={this.state.editing}
            actions={this.props.actions} />
        </div>
        <a className='cursor-pointer' onClick={this.deleteTask.bind(this)}> <i className="fa fa-trash-o fa-lg pull-right"></i> </a>
      </div>
    )
  }
}
