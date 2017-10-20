import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const getStudent = student => {
  return {
    type: GET_STUDENT,
    student
  };
};

export const getStudents = students => {
  return {
    type: GET_STUDENTS,
    students
  };
};

export const remove = id => {
  return {
    type: REMOVE_STUDENT,
    id
  }
}

export const update = student => {
  return {
    type: UPDATE_STUDENT,
    student
  }
};

export const fetchStudent = id => dispatch => {
  return axios.get(`/api/students/${id}`)
    .then(res => dispatch(getStudent(res.data)))
    .catch(err => console.error('Getting student unsuccessful', err))
};

export const fetchStudents = () => {
  return dispatch => {
    return axios.get('/api/students')
      .then(res => dispatch(getStudents(res.data)))
      .catch(err => console.error('Getting students unsuccessful', err))
  };
};

export const postStudent = (student, email, campus) => {
  return dispatch => {
    return axios.post('/api/students', { name: student, email, campus })
      .then(res => dispatch(getStudent(res.data)))
      .catch(err => console.error('Posting student unsuccessful', err))
  };
};

export const removeStudent = id => {
  return dispatch => {
    dispatch(remove(id));
    axios.delete(`/api/students/${id}`)
      .catch(err => console.error(`Removing student: ${id} unsuccesful`, err));
  };
};

export const updateStudent = (id, name, email) => dispatch => {
  axios.put(`/api/students/${id}`, {name, email})
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating student: ${name} unsuccessful`, err));
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case GET_STUDENT:
      return [...state, action.student];
    case REMOVE_STUDENT:
      return state.filter(student => student.id !== action.id);
    case UPDATE_STUDENT:
      return state.map(student => (
        action.student.id === student.id ? action.student : student
      ))
    default:
      return state;
  }
};

