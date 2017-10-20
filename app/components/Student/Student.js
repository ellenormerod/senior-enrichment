import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
import { removeStudent } from '../../reducers/Students';

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();    
    this.removeStudentCB = this.removeStudentCB.bind(this);
  }

  render(){
    const student = this.props.student;
    return (
      <div className="list-group-item min-content student-list">
      <div className="media">
        <NavLink
          className="media-body"
          activeClassName="active"
          to={`/students/${student.id}`}>
          <h4 className="media-heading tucked">{(typeof(student) === 'string') ? student : student.name }</h4>
          <h4 className="media-heading tucked">{student.Campus ? student.Campus.name : <div></div> }</h4>                    
        </NavLink>
        <div className="media-right media-middle">
          <button
            className="btn btn-default"
            onClick={this.removeStudentCB}>
            <span className="glyphicon glyphicon-remove" />
          </button>
        </div>
      </div>
    </div>
    );
  }

  removeStudentCB (event) {
    const id = this.props.student.id
    event.stopPropagation();
    store.dispatch(removeStudent(id));
  }
}

// const mapState = (state, ownProps) => {
//   console.log('what', ownProps)
//   // const paramId = Number(ownProps.match.params.id);  
//   console.log('student state', state);
//   // const theStudent = state.campuses.find(campus => campus.id === paramId )  
//   return {
//     students: ownProps.student
//   }
// };

const mapDispatch = { removeStudent };

export default connect(null, mapDispatch)(Student);
