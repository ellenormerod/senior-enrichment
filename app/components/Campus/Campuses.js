import React, { Component } from 'react';
import store from '../../store.jsx';
import NewCampus from './NewCampus';
import Campus from './Campus';
import { fetchCampuses } from '../../reducers/Campuses'

export default class Campuses extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    store.dispatch(fetchCampuses())
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  render() {
    const messageId = Number(this.props.match.params.messageId);
    const campuses = this.state.campuses;
    return (
      <div className="campus-body">
        <ul className="campus-list" >
          <NewCampus messageId={messageId} />
          {campuses.map(campus => <Campus campus={campus} key={campus.id} />)}
        </ul>
      </div>
    )
  }

}