import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import axios from 'axios'
import '../styles/main.scss'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import AlertContainer from 'react-alert'

export default class PageLayout extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }
  state = { todoList : []};
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    transition: 'scale'
  }

  componentDidMount () {
    axios.get(`http://cfassignment.herokuapp.com/test/tasks`)
    .then(response => {
      this.props.actions.getTodoList(response.data.tasks)
      this.setState({ todoList: response.data.tasks })
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  showAlert (flag) {
    if (flag) {
      this.msg.show('Tasks Saved Successfully')
    } else {
      this.msg.error('Some error message or component')
    }
  }

  addTask () {
    this.props.actions.addTodo()
  }

  handleSave = () => {
    let payload = { tasks : this.props.todos }
    axios.post(`http://cfassignment.herokuapp.com/test/tasks`, payload)
    .then(response => {
      this.showAlert(true)
      this.setState({ todoList :this.props.todos })
    })
    .catch((error) => {
      this.showAlert(false)
      console.log('error', error)
    })
  }

  renderItems () {
    const { todos, actions } = this.props
    let todoList = _.values(this.props.todos)
    if (_.isNil(todoList) || todoList.length === 0) {
      return (<div> No Task Present</div>)
    } else {
      return _.map(todoList, (todo, index) => (<TodoItem key={index} item={todo} actions={actions} text={todo.task_title} createdAt={todo.created_at}/>));
    }
  }
  render() {
    return (
      <div>
        <div className='header-layout'></div>
        <div className='main-layout'>
          <Grid>
            <Row className="clearfix">
              <Col sm={8}>
                <h2 className='header-text'>Tasks</h2>
              </Col>
              <Col sm={4}>
                <Button className='btn-add' onClick={this.addTask.bind(this)}>Add Task</Button>
                <Button className='btn-save' onClick={this.handleSave.bind(this)} disabled={_.isEqual(this.state.todoList, this.props.todos)}>Save</Button>
              </Col>
            </Row>
          </Grid>
          <div className='item-container'>
            {this.renderItems()}
          </div>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        </div>
      </div>
    )
  }
}
