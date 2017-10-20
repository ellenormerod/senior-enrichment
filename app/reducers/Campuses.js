import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'

export const getCampus = campus => {
  return {
    type: GET_CAMPUS,
    campus
  };
};

export const getCampuses = campuses => {
  return {
    type: GET_CAMPUSES,
    campuses
  };
};

export const remove = id => {
  return {
    type: REMOVE_CAMPUS,
    id
  }
};

export const update = campus => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
}

export const fetchCampus = id => dispatch => {
  return axios.get(`/api/campuses/${id}`)
    .then(res => dispatch(getCampus(res.data)))
    .catch(err => console.error('Getting campus unsuccessful', err))    
}

export const fetchCampuses = () => {
  return dispatch => {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses))
      })
      .catch(err => console.error('Getting campuses unsuccessful', err))
  };
};

export const postCampus = campus => {
  return dispatch => {
    return axios.post('/api/campuses', { name: campus })
      .then(res => dispatch(getCampus(res.data)))
      .catch(err => console.error('Posting campus unsuccessful', err))
  };
};

export const removeCampus = id => {
  return dispatch => {
    dispatch(remove(id));
    axios.delete(`/api/campuses/${id}`)
      .catch(err => console.error(`Removing campus: ${id} unsuccesful`, err));
  };
};

export const updateCampus = (id, campus) => dispatch => {
  axios.put(`/api/campuses/${id}`, {name: campus})
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating campus: ${id} unsuccesful`, err))
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case GET_CAMPUS:
      return [...state, action.campus];
    case REMOVE_CAMPUS:
      return state.filter(campus => campus.id !== action.id);
    case UPDATE_CAMPUS:
      return state.map(campus => (
        action.campus.id === campus.id ? action.campus : campus
      ))
    default:
      return state;
  }
};