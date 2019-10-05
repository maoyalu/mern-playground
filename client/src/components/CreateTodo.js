import React, { Component } from 'react';
import axios from 'axios';
import {server, todoCreateApi} from '../config/server';


export default class CreateTodo extends Component {

    constructor(props){
        super(props);

        this.state = {
            description: ''
        }

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeTodoDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newTodo = {
            description: this.state.description
        };
        
        const BASE_URL = process.env.HOST
        const url = server + todoCreateApi
        axios.post(url, newTodo)
            .then(res => console.log(res.data));

        this.setState({
            description: ''
        });
    }

    render(){
        return(
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type="text" 
                                className="form-control" 
                                value={this.state.description} 
                                onChange={this.onChangeTodoDescription} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}