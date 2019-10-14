import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import {todoApi, todoDeleteApi} from '../config/server';
import axios from 'axios';


const Todo = props => (
    <tr>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>
                <Button primary>Edit</Button>
            </Link>
            <Button negative onClick={() => props.onDelete(props.todo._id)}>Delete</Button>
        </td>
    </tr>
);


export default class TodoList extends Component {

    constructor(props){
        super(props);
        this.state = {todos: []};
    }

    componentDidMount(){
        axios.get(todoApi)
            .then(res => this.setState({todos: res.data}))
            .catch(err => console.log(err));
    }

    onDelete = id => {
        axios.delete(todoDeleteApi + id)
            .then(() => {
                this.setState((prevState) => ({
                    todos: prevState.todos.filter(todo => todo._id !== id),
                }))
            })
            .catch(err => console.log(err));
    }

    todoList(){
        return this.state.todos.sort((a, b) => b.priority - a.priority)
                                .sort((a, b) => a.completed - b.completed)
                                .map( (todo, i) => {
            return <Todo todo={todo} onDelete={this.onDelete} key={i} />;
        });
    }

    render(){
        return(
            <div>
                <Link to={"/create"}>
                    <Button positive>New Todo</Button>
                </Link>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        );
    }
}