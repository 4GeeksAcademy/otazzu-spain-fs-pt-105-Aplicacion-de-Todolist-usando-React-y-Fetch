import React from "react";

export const ListBox = (props) => {

    return(
        <>
        <ul className="list-group list-group-flush text-start">
            {props.state.todos.length === 0 ? (<li className="list-group-item task">No hay tareas pendientes</li>
            ) : (props.state.todos.map((todo) => <li className="list-group-item d-flex justify-content-between align-items-center task" key={todo.id}>{todo.label}
                <button className="delete-btn btn btn-sm btn-danger" onClick={() => props.deleteTodo(todo.id)}>x</button>
             </li>
            ))}
        </ul>
        <li className="list-group-item text-muted task">Items: {props.state.todos.length}</li>
        </>
    )
}