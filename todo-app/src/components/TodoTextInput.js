import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoTextInput extends Component {
  static propTypes = {
    text: PropTypes.string,
    createdAt: PropTypes.string,
    actions: PropTypes.object.isRequired,
    newTask: PropTypes.bool
  }

  state = { text: this.props.text || '', editing: false, newTask: this.props.newTask || false }

  componentWillMount () {
    if (this.props.newTask) {
      this.setState( { text : '' })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      this.setState({text:nextProps.text})
    }
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    this.props.actions.editTodo(this.props.createdAt, e.target.value)
    this.setState({ editing : false, newTask: false })
  }

  render () {
    let element
    if (this.state.editing || this.props.newTask) {
      element = (
        <input
          type='text'
          autoFocus='true'
          placeholder='Enter Task'
          value={this.state.text}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit} />
      )
    } else {
      element = (<span className='task-name' onDoubleClick={this.handleDoubleClick.bind(this)}>{this.props.text}</span>)
    }
    return (
      <div>
        { element }
      </div>
    )
  }
}
