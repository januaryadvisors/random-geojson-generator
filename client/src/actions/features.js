export const ADD_POINT = 'ADD_POINT';
export const ADD_LINE = 'ADD_LINE';
export const ADD_POLYGON = 'ADD_POLYGON';

export const EDIT_POINT = 'EDIT_POINT';
export const SET_INDICES = 'SET_INDICES';

export const addPoint = (point) => ({ type: ADD_POINT, payload: point })
export const addLine = (line) => ({ type: ADD_LINE, payload: line })
export const addPolygon = (polygon) => ({ type: ADD_POLYGON, payload: polygon })

export const setIndices = (index, subIndex) => ({ type: SET_INDICES, index: index, subIndex: subIndex })
export const editPoint = (index, subIndex, properties) => ({ type: EDIT_POINT, index: index, subIndex: subIndex, properties: properties })