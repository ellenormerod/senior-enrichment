
const ADD_CAMPUS = 'ADD_CAMPUS';

export const addCampus = (name) => {
  return {
    type: ADD_CAMPUS,
    name
  }
}

export default (state = '', action) => {
  switch (action.type) {
    case ADD_CAMPUS:
      return action.name;

    default:
      return state;
  }
}