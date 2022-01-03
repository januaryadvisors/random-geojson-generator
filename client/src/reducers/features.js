import { ADD_POINT, ADD_LINE, ADD_POLYGON } from '../actions/features';

const defaultState = {
  points: [],
  lines: [],
  polygons: [],
}

const featuresReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_POINT:
        return {
          ...state,
          points: [...state.points, action.payload]
        }
    case ADD_LINE:
        return {
          ...state,
          lines: [...state.lines, action.payload]
        }
    case ADD_POLYGON:
        return {
          ...state,
          polygons: [...state.polygons, action.payload]
        }
    default:
        return state;
  }
};

export default featuresReducer;