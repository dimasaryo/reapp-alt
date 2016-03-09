import alt from '../alt';

class TodoActions {
	addTodo(text){
		return text;
	}

	toggleTodo(id){
		return id;
	}

	clearTodos(){
		return null;
	}
}

export default alt.createActions(TodoActions);