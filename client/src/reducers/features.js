import { 
  ADD_POINT, 
  ADD_LINE, 
  ADD_POLYGON, 
  SET_INDEX, 
  EDIT_OBJECT,
  DELETE_OBJECT,
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
    case EDIT_OBJECT:
        if (action.object === "point") {
          const editedPoints = [...state.points];
          editedPoints[action.index] = action.properties;
          return { 
            ...state,
            points: editedPoints
          }
        } else if (action.object === "line") {
          const editedLines = [...state.lines];
          editedLines[action.index] = action.properties;
          return { 
            ...state,
            lines: editedLines
          }
        } else {
          const editedPolygons = [...state.polygons];
          editedPolygons[action.index] = action.properties;
          return { 
            ...state,
            polygons: editedPolygons
          }
        }
    case DELETE_OBJECT:
        if (action.object === "point") {
          const deletedPoint = [...state.points];
          deletedPoint.splice(action.index, 1);
          return {
            ...state,
            points: deletedPoint
          }
        } else if (action.object === "line") {
          const deletedLine = [...state.lines];
          deletedLine.splice(action.index, 1);
          return {
            ...state,
            lines: deletedLine
          }
        } else {
          const deletedPolygon = [...state.polygons];
          deletedPolygon.splice(action.index, 1);
          return {
            ...state,
            polygons: deletedPolygon
          }
        }
    case ADD_PROPERTIES:
        if (action.object === "point") {
          const addedPoints = [...state.points];
          addedPoints[action.index].propertyOptions.push({ name: '', type: '', values: '', min: '', max: '' });
          return {
            ...state,
            points: addedPoints
          }
        } else if (action.object === "line") {
          const addedLines = [...state.lines];
          addedLines[action.index].propertyOptions.push({ name: '', type: '', values: '', min: '', max: '' });
          return {
            ...state,
            lines: addedLines
          }
        } else {
          const addedPolygons = [...state.polygons];
          addedPolygons[action.index].propertyOptions.push({ name: '', type: '', values: '', min: '', max: '' });
          return {
            ...state,
            polygons: addedPolygons
          }
        }
    case DELETE_PROPERTIES:
        if (action.object === "point") {
          const deletedPoints = [...state.points];
          deletedPoints[action.index].propertyOptions.splice(action.subIndex, 1);
          return {
            ...state,
            points: deletedPoints
          }
        } else if (action.object === "line") {
          const deletedLines = [...state.lines];
          deletedLines[action.index].propertyOptions.splice(action.subIndex, 1);
          return {
            ...state,
            lines: deletedLines
          }
        } else {
          const deletedPolygons = [...state.polygons];
          deletedPolygons[action.index].propertyOptions.splice(action.subIndex, 1);
          return {
            ...state,
            polygons: deletedPolygons
          }
        }
    default:
        return state;
  }
};

export default featuresReducer;