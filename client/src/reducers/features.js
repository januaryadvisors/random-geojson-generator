import { ADD_POINT, ADD_LINE, ADD_POLYGON, DELETE_POINT, DELETE_LINE, DELETE_POLYGON } from '../actions/features';

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
    case DELETE_POINT:
        const lengthPointFeatures = state.points[action.index].propertyOptions.length;
        const newPoints = [...state.points];
        const newPointsPropertyOptions = state.points[action.index].propertyOptions.filter((property, index) => index !== action.subIndex)
        newPoints[action.index].propertyOptions = newPointsPropertyOptions;
        newPoints[action.index].num -= 1;

        return {
          ...state,
          points: lengthPointFeatures === 1 ? state.points.filter((point, index) => index !== action.index) : newPoints
        }
    case DELETE_LINE:
        const lengthLineFeatures = state.lines[action.index].propertyOptions.length;
        const newLines = [...state.lines];
        const newLinesPropertyOptions = state.lines[action.index].propertyOptions.filter((property, index) => index !== action.subIndex)
        newLines[action.index].propertyOptions = newLinesPropertyOptions;
        newLines[action.index].num -= 1;

        return {
          ...state,
          lines: lengthLineFeatures === 1 ? state.lines.filter((point, index) => index !== action.index) : newLines
        }
    case DELETE_POLYGON:
        const lengthPolygonFeatures = state.polygons[action.index].propertyOptions.length;
        const newPolygons = [...state.polygons];
        const newPolygonsPropertyOptions = state.polygons[action.index].propertyOptions.filter((property, index) => index !== action.subIndex)
        newPolygons[action.index].propertyOptions = newPolygonsPropertyOptions;
        newPolygons[action.index].num -= 1;

        return {
          ...state,
          polygons: lengthPolygonFeatures === 1 ? state.polygons.filter((point, index) => index !== action.index) : newPolygons
        }
    default:
        return state;
  }
};

export default featuresReducer;