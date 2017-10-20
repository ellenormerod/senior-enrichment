import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { addCampus } from '../../reducers/NewCampus';
import { postCampus } from '../../reducers/Campuses';

class NewCampus extends Component {

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
    store.dispatch(addCampus(evt.target.value))
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const name = this.state.NewCampus;
    store.dispatch(postCampus(name));
    store.dispatch(addCampus(''));
  }

  render() {
    return (
      <form id="new-campus-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.NewCampus}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Add a Campus!</button>
          </span>
        </div>
      </form>
    );
  }
}


const mapDispatch = { postCampus }

export default connect(null, mapDispatch)(NewCampus);