import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import axios from 'axios'
import '../styles/main.scss'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import { Alert } from 'react-bootstrap';

export default class PageLayout extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }
  state = { todoList : [], alertVisible: false, alertType: ''};

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

  addTask () {
    this.props.actions.addTodo()
  }

  handleSave = () => {
    let payload = { tasks : this.props.todos }
    axios.post(`http://cfassignment.herokuapp.com/test/tasks`, payload)
    .then(response => {
      this.setState({ todoList :this.props.todos})
      this.handleAlertShow('success')
    })
    .catch((error) => {
      this.handleAlertShow('failed')
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

  renderAlert() {
    if (this.state.alertVisible) {
      if(this.state.alertType === 'success') {
        return (
            <Alert bsClass="custom-alert alert-success"  onDismiss={this.handleAlertDismiss.bind(this)}>
              <p>Tasks Saved Successfully</p>
            </Alert>
        )
      } else if(this.state.alertType === 'failed')
      return (
          <Alert bsClass="custom-alert alert-danger" onDismiss={this.handleAlertDismiss.bind(this)}>
            <p>Error Occured</p>
          </Alert>
      )
    }
  }

  handleAlertDismiss () {
    this.setState({ alertVisible: false })
  }

  handleAlertShow (type) {
    this.setState({ alertVisible: true, alertType: type })
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
          {this.renderAlert()}
        </div>
      </div>
    )
  }
}
