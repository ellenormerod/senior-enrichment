import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
import { removeCampus } from '../../reducers/Campuses';
import { removeStudent } from '../../reducers/Students';

class Campus extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.removeCampusCB = this.removeCampusCB.bind(this);
  }

  render() {
    const campus = this.props.campus;
    return (
      <div className="list-group-item min-content campus-item">
        <div className="media">
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/campuses/${campus.id}`}>
            <h4 className="media-heading tucked">{campus.name}</h4>
          </NavLink>
          <div className="media-left">
            <a href="#">
              <img className="media-object" src={campus.image} alt="image" />
            </a>
          </div>
          <div className="media-right media-middle">
            <button
              className="btn btn-default"
              onClick={this.removeCampusCB}>X
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  removeCampusCB(event) {
    const { campus, removeStudent, removeCampus } = this.props
    event.stopPropagation();
    store.dispatch(removeCampus(campus.id));
  }
}

/* -----------------    CONTAINER     ------------------ */
// const mapState = state => {
//   console.log('campus state', state)
//   return {
//     name: state.name
//   }
// };

const mapDispatch = { removeCampus, removeStudent };

export default connect(null, mapDispatch)(Campus);