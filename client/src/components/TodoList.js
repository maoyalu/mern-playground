import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {server, todoApi} from '../config/server';
import axios from 'axios';


const Todo = props => (
    <tr>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
        <td className={props.todo.completed ? 'completed' : ''}>{props.todo.priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
);


export default class TodoList extends Component {

    constructor(props){
        super(props);
        this.state = {todos: []};
    }

    componentDidMount(){
        const url = server + todoApi;
        axios.get(url)
            .then(res => this.setState({todos: res.data}))
            .catch(err => console.log(err));
    }

    todoList(){
        return this.state.todos.map( (curr, i) => {
            return <Todo todo={curr} key={i} />;
        });
    }

    render(){
        return(
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Action</th>
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