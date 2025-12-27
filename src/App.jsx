import { useState, useEffect } from 'react'
import {ToDoProvider} from './context'
import './App.css'
import ToDoForm from './components/ToDoForm'
import ToDoItem from './components/ToDoItem'

function App() {
  const [toDoList, setTodos] = useState([])

  const addToDo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const editToDo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const checked = (id) => {
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoList))
  }, [toDoList])
  



  return (
    <ToDoProvider value={{toDoList, addToDo, editToDo, deleteToDo,checked}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <ToDoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {toDoList.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <ToDoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </ToDoProvider>
  )
}

export default App