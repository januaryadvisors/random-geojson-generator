import { ADD_POINT, ADD_LINE, ADD_POLYGON, SET_INDICES, EDIT_POINT, EDIT_LINE, EDIT_POLYGON } from '../actions/features';

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

    case SET_INDICES:
        return {
          ...state,
          index: action.index,
          subIndex: action.subIndex
        }
    case EDIT_POINT:
        const newPoints = [...state.points];
        newPoints[action.index].propertyOptions[action.subIndex] = action.properties;
        return { 
          ...state,
          points: newPoints
        }
    case EDIT_LINE:
      const newLines = [...state.lines];
      newLines[action.index].numVertices = action.properties.numVertices;
      newLines[action.index].maxSegmentLength = action.properties.maxSegmentLength;
      newLines[action.index].maxSegmentRotation = action.properties.maxSegmentRotation;
      newLines[action.index].propertyOptions[action.subIndex].name = action.properties.name;
      newLines[action.index].propertyOptions[action.subIndex].type = action.properties.type;
      newLines[action.index].propertyOptions[action.subIndex].values = action.properties.values;
      newLines[action.index].propertyOptions[action.subIndex].min = action.properties.min;
      newLines[action.index].propertyOptions[action.subIndex].max = action.properties.max;
      return {
        ...state,
        line: newLines
      }
    case EDIT_POLYGON:
      const newPolygons = [...state.polygons];
      newPolygons[action.index].numVertices = action.properties.numVertices;
      newPolygons[action.index].maxRadialLength = action.properties.maxRadialLength;
      newPolygons[action.index].propertyOptions[action.subIndex].name = action.properties.name;
      newPolygons[action.index].propertyOptions[action.subIndex].type = action.properties.type;
      newPolygons[action.index].propertyOptions[action.subIndex].values = action.properties.values;
      newPolygons[action.index].propertyOptions[action.subIndex].min = action.properties.min;
      newPolygons[action.index].propertyOptions[action.subIndex].max = action.properties.max;
      return {
        ...state,
        polygons: newPolygons
      }
    default:
        return state;
  }
};

export default featuresReducer;