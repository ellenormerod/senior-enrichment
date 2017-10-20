
const ADD_STUDENT = 'ADD_STUDENT';

export const addStudent = (name) => {
  return {
    type: ADD_STUDENT,
    name
  }
}

export default (state = '', action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return action.name;

    default:
      return state;
  }
}