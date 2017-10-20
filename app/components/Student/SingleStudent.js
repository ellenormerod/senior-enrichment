import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import store from '../../store';
import { postCampus } from '../../reducers/Campuses';
import { updateStudent, fetchStudent } from '../../reducers/Students';

class SingleStudent extends React.Component {

  constructor() {
    super();
    this.state = store.getState();
    this.updateStudentCB = this.updateStudentCB.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    store.dispatch(fetchStudent(id))
  }

  updateStudentCB(event) {
    event.preventDefault()
    const id = this.props.match.params.id;
    let name;
    let email;
    event.target.name ? name = event.target.name.value : name = this.props.name;
    event.target.email ? email = event.target.email.value : email = this.props.email;
    store.dispatch(updateStudent(id, name, email))
    if (event.target.name) (event.target.name.value = '');
    if (event.target.email) (event.target.email.value = '');    
  }

  render() {
    const { name, campus, campusId, email } = this.props;
    // if (!name) return <div />  // the user id is invalid or data isn't loaded yet
    return (
      <div className="container">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h1 className="panel-title large-font">{name}</h1>
            {this.renderEditName()}
            <h1 className="panel-title large-font">{email}</h1>
            {this.renderEditEmail()}            
            <h2 className="panel-title large-font">Campus</h2>
            <NavLink
              className="media-body"
              activeClassName="active"
              to={`/campuses/${campusId}`}>
              <h4 className="media-heading tucked">{campus ? campus.name : <div />}</h4>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  renderEditName() {
    return (
      <form id="new-student-form" onSubmit={this.updateStudentCB}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={this.handleChange}
            placeholder="Edit your name"
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Edit!</button>
          </span>
        </div>
      </form>
    )
  }

  renderEditEmail() {
    return (
      <form id="new-student-form" onSubmit={this.updateStudentCB}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="Edit your email"
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
  let theStudent
  state.students.length ? theStudent = state.students.find(student => student.id === paramId) : state.campuses.find(student => theStudent = student.Students.find(each => each.id === paramId));
  return {
    name: theStudent.name,
    id: theStudent.id,
    email: theStudent.email,
    campus: theStudent.Campus,
    campusId: theStudent.CampusId
  }
};

const mapDispatch = { postCampus, updateStudent };

export default connect(mapState, mapDispatch)(SingleStudent);

