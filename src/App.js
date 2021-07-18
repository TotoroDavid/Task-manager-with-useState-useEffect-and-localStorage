import React, { useState, useEffect } from 'react'
import TaskRow from './components/TaskRow'
import TaskBanner from './components/TaskBanner'
import TaskCreator from './components/TaskCreator'
import VisibilityControl from './components/VisibilityControl'

const App = () => {

  const [userName, setUserName] = useState('Dave')
  const [taskItems, setTaskItems] = useState([
    { id: 1, name: 'Task One', done: false },
    { id: 2, name: 'Task two', done: false },
    { id: 3, name: 'Task three', done: true },
    { id: 4, name: 'Task four', done: false },
  ])
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setUserName(`dave's example`)
      setTaskItems([
        { id: 1, name: 'Task example One', done: false },
        { id: 2, name: 'Task example two', done: false },
        { id: 3, name: 'Task example three', done: true },
        { id: 4, name: 'Task example four', done: false },
      ])
      setShowCompleted(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  const createNewTask = taskName => {
    if (!taskItems.find(newTask => newTask.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }

  const toggleTask = task => (
    setTaskItems(taskItems.map(newTask => (newTask.name === task.name
      ? { ...newTask, done: !newTask.done }
      : newTask)))
  )

  const taskTableRows = (doneValue) => {
    return (
      taskItems
        .filter(task => task.done === doneValue)
        .map(task => (
          <TaskRow
            task={task}
            key={task.name}
            toggleTask={toggleTask}
          />
        ))
    )
  }

  return (
    <div>
      <TaskBanner
        userName={userName}
        taskItems={taskItems}
      />
      <TaskCreator
        callback={createNewTask}
      />
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>
      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description='Completed Task!!'
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>
      {
        showCompleted && (
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default App
