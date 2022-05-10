import { 
  ADD_POINT, 
  ADD_LINE, 
  ADD_POLYGON, 
  SET_INDEX, 
  EDIT_POINT,
  DELETE_PROPERTIES,
  ADD_PROPERTIES
} from '../actions/features';

const defaultState = {
  points: [],
  lines: [],
  polygons: [],
  index: null,
  subIndex: null,
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
    case SET_INDEX:
        return {
          ...state,
          index: action.index
        }
    case EDIT_POINT:
        const editedPoints = [...state.points];
        editedPoints[action.index] = action.properties;
        return { 
          ...state,
          points: editedPoints
        }
    case DELETE_PROPERTIES:
        const deletedPropertiesPoints = [...state.points];
        console.log(deletedPropertiesPoints[action.index].propertyOptions)
        deletedPropertiesPoints[action.index].propertyOptions.splice(action.subIndex, 1);
        return {
          ...state,
          points: deletedPropertiesPoints
        }
    case ADD_PROPERTIES:
        const addedPropertiesPoints = [...state.points];
        addedPropertiesPoints[action.index].propertyOptions.push({ name: '', type: '', values: '', min: '', max: '' });
        return {
          ...state,
          points: addedPropertiesPoints
        }
    default:
        return state;
  }
};

export default featuresReducer;