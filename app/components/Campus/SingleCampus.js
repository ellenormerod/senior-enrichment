import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import store from '../../store';
import { postStudent } from '../../reducers/Students';
import { addStudent } from '../../reducers/NewStudent';
import Student from '../Student/Student';
import { fetchCampus, updateCampus } from '../../reducers/Campuses';

class SingleCampus extends React.Component {

  constructor() {
    super();
    this.state = store.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCampusCB = this.updateCampusCB.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.params.id
    store.dispatch(fetchCampus(id))
  }

  updateCampusCB(event) {
    event.preventDefault()
    const id = this.props.match.params.id;
    const campus = event.target.campus.value;
    store.dispatch(updateCampus(id, campus))
    event.target.campus.value = ''; 
  }

  // handleChange(evt) {
  //   store.dispatch(addStudent(evt.target.value))
  // }

  handleSubmit(evt) {
    evt.preventDefault();
    const name = evt.target.name.value;
    const email = evt.target.email.value;
    const campus = evt.target.campus.value;
    store.dispatch(postStudent(name, email, campus));
    evt.target.name.value = '';
    evt.target.email.value = '';
    evt.target.campus.value = ''
  }

  render() {
    const { students, name } = this.props;
    return (
      <div className="container">
        <div className="panel panel-warning">
        <div className="panel-heading">
        <h2 className="panel-title large-font">{name}</h2>
        {this.renderEditCampus()}        
      </div>
          <div className="panel-heading">
            <h2 className="panel-title large-font">Students</h2>
          </div>
          <ul className="list-group">
            <form className="list-group-item story-item" onSubmit={this.handleSubmit}>
              <input
                name="name"
                type="text"
                className="form-like"
                required
                placeholder="Enter your name"
              />
              <input
              name="email"
              type="text"
              className="form-like"
              required
              placeholder="Enter your email"
            />
            <input
            name="campus"
            type="text"
            className="form-like"
            required
            placeholder="Enter a campus"
          />
              <button type="submit" className="btn btn-warning btn-xs">
                <span className="glyphicon glyphicon-plus" />
              </button>
            </form>
            { 
              students ? students
                .map(student => <Student name={name} student={student} key={student.id} />) : <div></div>
            }
            
          </ul>
        </div>
      </div>
    );
  }

  renderEditCampus(){
    return (
      <form id="new-campus-form" onSubmit={this.updateCampusCB}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="campus"
            placeholder="Edit your campus name"
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Edit!</button>
          </span>
        </div>
      </form>
    )
  }
}


const mapState = (state, ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  let theCampus,
      obj;
  state.campuses.length ? theCampus = state.campuses.find(campus => campus.id === paramId) : theCampus = state.students.find(campus => campus.Campus.id === paramId);
  state.campuses.length ? obj = {
    name: theCampus.name,
    students: theCampus.Students
  } : obj = {
    name: theCampus.Campus.name,
    students: theCampus.Campus.students
  };
  return obj;
};

const mapDispatch = { postStudent, updateCampus };

export default connect(mapState, mapDispatch)(SingleCampus);

