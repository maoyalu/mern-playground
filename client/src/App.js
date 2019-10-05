import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import "bootstrap/dist/css/bootstrap.min.css";


import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";
import CreateTodo from "./components/CreateTodo";


class App extends Component {
  render(){
    return(
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="nav-brand" href="https://yalustudio.com">
              
            </a>
            <Link to="/" className="navbar-brand">PLAYGROUND</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
        <div className="container">
          
          <br></br>

          <Route path="/" exact component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
