import { ADD_POINT, ADD_LINE, ADD_POLYGON, SET_INDICES, EDIT_POINT } from '../actions/features';

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

    case SET_INDICES:
        return {
          ...state,
          index: action.index,
          subIndex: action.subIndex
        }
    case EDIT_POINT:
        // find which point it is
        // edit the properties
        return {
          ...state,
          points: state.points.map((point, index) => {
            if (index === action.index) {
              return {
                ...point,
                properties: point.properties.map((property, subIndex) => {
                  if (subIndex === action.subIndex) {
                    return {
                      ...property,
                      value: action.value
                    }
                  }
                  return property
                })
              }
            }
            return point
          })
        }
    default:
        return state;
  }
};

export default featuresReducer;