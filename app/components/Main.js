import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Students from './Student/Students';
import Campuses from './Campus/Campuses';
import Home from './Home';
import Navbar from './Navbar';
import SingleCampus from './Campus/SingleCampus';
import SingleStudent from './Student/SingleStudent';

export default class Main extends Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/campuses' component={Campuses} />
            <Route exact path='/students' component={Students} />
            <Route path="/campuses/:id" component={SingleCampus} />  
            <Route path="/students/:id" component={SingleStudent} />                        
          </Switch>
        </div>
      </Router>
    )
  }
}
