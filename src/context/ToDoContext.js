import { useContext, createContext } from "react";

export const ToDoContext = createContext({
    toDoList : [
        {
            id : 1,
            toDo : 'Hello',
            completed : false,
        }
    ],
    addToDo : (toDo) => {},
    editToDo : (id, toDo) => {},
    deleteToDo : (id) => {},
    checked : (id) => {}

});

export const useToDo = ()=>{
    return useContext(ToDoContext)
}

export const ToDoProvider = ToDoContext.Provider;