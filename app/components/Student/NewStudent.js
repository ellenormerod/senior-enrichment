import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { addStudent } from '../../reducers/NewStudent';
import { postStudent } from '../../reducers/Students';
import { fetchCampus } from '../../reducers/Campuses'

class NewStudent extends Component {

  constructor() {
    super();
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(evt) {
    store.dispatch(addStudent(evt.target.value))
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const email = evt.target.email.value
    const name = evt.target.name.value;
    const campus = evt.target.campus.value
    store.dispatch(postStudent(name, email, campus));
    evt.target.email.value = '';
    evt.target.name.value = '';
    evt.target.campus.value = '';    
  }

  render() {
    return (
      <div className="list-group-item min-content student-item">
        <form className="media" onSubmit={this.handleSubmit}>
          <div className="media-left media-middle icon-container">
            <button
              type="submit"
              className="glyphicon glyphicon-plus clickable"
            />
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="form-like"
                onChange={this.handleChange}                
              />
            </h4>
            <h5 className="tucked">
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="form-like"
                onChange={this.handleChange}                
              />
            </h5>
            <h5 className="tucked">
            <input
              name="campus"
              type="campus"
              required
              placeholder="Enter a campus"
              className="form-like"
              onChange={this.handleChange}                
            />
          </h5>
          </div>
        </form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */


const mapDispatch = { postStudent };

export default connect(null, mapDispatch)(NewStudent);

