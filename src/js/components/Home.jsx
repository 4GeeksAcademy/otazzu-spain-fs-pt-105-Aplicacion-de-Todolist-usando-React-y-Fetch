import React, {useState, useEffect} from "react";
import { ListBox } from "./ListBox";

const Home = () => {

	const [state, setState] = useState({name: "", todos: []})
	const [task, setTask] = useState("")

	const createUser = async () => { // Funcion de crear el usuario si no existe
		
		try {
			const response = await fetch ('https://playground.4geeks.com/todo/users/otazzu',{
				method: 'POST',
				headers: {
					'Content-Type':'application/json'
				},
				body: JSON.stringify({
					"name": "otazzu",
					"id": 0
				})
			});

			if(response.status === 201){
				getTodos();
			}

		} catch (error) {
			console.log(error)
		}
		
	}

	const getTodos = async () =>{
		try {
			const response = await fetch('https://playground.4geeks.com/todo/users/otazzu')

			if(response.ok){

			const data = await response.json()
			console.log(data)
			setState(data)

			}else if(response.status === 404){//Si no existe el usuario
				createUser();//Se crea el usuario
			}
		} catch (error) {
			console.log(error)
		}
	}

	const onChange = (event)=>{
		setTask(event.target.value)
	}

	const onKeyDown = async (event) => {
		if (event.keyCode === 13){
			if(task.trim() === "" ) {
				event.target.value = ("")//Para limpar el input en caso de poner espacios
				alert("Valor incorrecto, por favor añada una tarea.")
				return;
			}
			const tarea = await createTodo(task)
			setTask(tarea)
			event.target.value = ("")// Volver a limpiar el input al dar enter
		}
	}

	const createTodo = async (task) => {
		try {
			const response = await fetch ('https://playground.4geeks.com/todo/todos/otazzu',{
				method: 'POST',
				headers: {
					'Content-Type':'application/json'
				},
				body: JSON.stringify({
					"label": task,
					"is_done": false
				})
			});

		if(response.status === 201){
			getTodos();
		}

		} catch (error) {
			console.log(error)
		}
	}

	const deleteTodo = async (todoId) => {
		console.log(todoId)
		try {
			const response = await fetch (`https://playground.4geeks.com/todo/todos/${todoId}`, {
				method: "DELETE"
			});

			console.log(response.status)

			if(response.status === 204){
				getTodos();
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		getTodos()
		
	},[])

	return (
		<div className="text-center">
			<h1 className="display-1">TODOS</h1>
			<input type="text" placeholder="What needs to be done?" onChange={onChange} onKeyDown={onKeyDown}></input>
			<ListBox
				state={state}
				setState={setState}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
};

export default Home;