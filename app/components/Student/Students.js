import React, { Component } from 'react';
import store from '../../store.jsx';
import NewStudent from './NewStudent';
import Student from './Student';
import { fetchStudents } from '../../reducers/Students'


export default class Students extends Component {

  constructor(props){
    super(props);
    this.state = store.getState()
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=> this.setState(store.getState()))
    store.dispatch(fetchStudents());
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render (){
    const students = this.state.students;
    return (
      <div className="students-list" >
          {students.map(student => <Student student={student} key={student.id} />)}
        <NewStudent />
        </div>
      )
    }
  }