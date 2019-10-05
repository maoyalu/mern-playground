import React, { Component } from 'react';
import axios from 'axios';
import {todoApi, todoUpdateApi} from '../config/server'


export default class EditTodo extends Component {
    constructor(props){
        super(props);

        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this)
        this.onChangeTodoDescrption = this.onChangeTodoDescrption.bind(this)
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            description: '',
            priority: '',
            completed: false
        }
    }

    componentDidMount(){
        const url = todoApi + this.props.match.params.id
        axios.get(url)
            .then(res => {
                this.setState({
                    description: res.data.description,
                    priority: res.data.priority,
                    completed: res.data.completed
                });
            })
            .catch(err => console.log(err));
    }

    onSubmit(e){
        e.preventDefault();
        const todo = {
            description: this.state.description,
            priority: this.state.priority,
            completed: this.state.completed
        };
        const url = todoUpdateApi + this.props.match.params.id
        axios.patch(url, todo)
            .then(res => console.log(res.data));
        this.props.history.push('/');
    }

    onChangeTodoCompleted(){
        this.setState({
            completed: !this.state.completed
        });
    }

    onChangeTodoDescrption(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeTodoPriority(e){
        this.setState({
            priority: e.target.value
        });
    }

    render(){
        return(
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeTodoDescrption} />
                    </div>
                    <div className="form-group">
                        <label>Priority:</label>
                        <input type="text"
                                className="form-control"
                                value={this.state.priority}
                                onChange={this.onChangeTodoPriority} />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.completed}
                                value={this.state.completed} />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        );
    }
}