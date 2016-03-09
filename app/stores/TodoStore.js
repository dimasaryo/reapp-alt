import alt from '../alt';
import TodoActions from '../actions/TodoActions';


class TodoStore {
	constructor(){
		this.bindListeners({
			addTodo: TodoActions.addTodo,
			toggleTodo: TodoActions.toggleTodo,
			clearTodos: TodoActions.clearTodos
		});



		this.state = {
			todoId : 1,
			todos : { '1': { id: 1, text: "first todo", complete: false }}
		};
	}

	addTodo(text){
		const id = this._nextTodoId();

		const todo = {
			id: id,
			text: text,
			complete: false
		};

		let todos = this.state.todos;
		todos[id] = todo;

		this.setState({todos: todos});
	}

	toggleTodo(id){
		let todos = this.state.todos;
		console.log(id);
		todos[id].complete = !todos[id].complete;
		this.setState({todos: todos});
	}

	clearTodos(){
		const todos = this.state.todos;
		let newTodos = {};
		for(const key in todos){
			if (!todos[key].complete){
				newTodos[key] = todos[key];
			}
		}
		this.setState({todos: newTodos});
	}

	_nextTodoId(){
		return ++this.state.todoId;
	}

}

export default alt.createStore(TodoStore, 'TodoStore')