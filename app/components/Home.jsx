import { Reapp, React, NestedViewList, View, Button } from 'reapp-kit';
import Form from 'reapp-ui/components/Form';
import List from 'reapp-ui/components/List';
import connectToStores from 'alt-utils/lib/connectToStores';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';

@connectToStores
class Home extends React.Component {

  state = {
    newTodo: ""
  }

  static getStores(){
    return [TodoStore];
  }

  static getPropsFromStores(){
    return TodoStore.getState();
  }

  addTodo(event){
    TodoActions.addTodo(this.state.newTodo);
    this.setState({newTodo: ""})
  }

  toggleTodo(key){
    TodoActions.toggleTodo(key);
  }

  clearTodos(){
    TodoActions.clearTodos();
  }

  handleNewTodoChange(event){
    this.setState({newTodo: event.target.value});
  }

  render() {
    let todos = [];
    for(const key in this.props.todos){
      const styles = {
        textDecoration: this.props.todos[key].complete ? "line-through" : ""
      }
      todos.push(<List.Item value={key} style={styles} onTap={this.toggleTodo.bind(this, key)} title={this.props.todos[key].text}/>)
    }

    return (
      <NestedViewList {...this.props.viewListProps}>
        <View title="todolist">
          <form>
            <List wrap>
              <Form.Input name="todo" placeholder="To do" value={this.state.newTodo} onChange={this.handleNewTodoChange} />
            </List>
          </form>
          <Button onTap={this.addTodo}>Add</Button>
          <Button onTap={this.clearTodos}>Clear Completed</Button>
          <List>
            {todos}
          </List>
        </View>

        {this.props.child()}
      </NestedViewList>
    );
  }
}

export default Reapp(Home);