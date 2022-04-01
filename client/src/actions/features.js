export const ADD_POINT = 'ADD_POINT';
export const ADD_LINE = 'ADD_LINE';
export const ADD_POLYGON = 'ADD_POLYGON';
export const DELETE_POINT = 'DELETE_POINT';
export const DELETE_LINE = 'DELETE_LINE';
export const DELETE_POLYGON = 'DELETE_POLYGON';

export const addPoint = (point) => ({ type: ADD_POINT, payload: point })
export const addLine = (line) => ({ type: ADD_LINE, payload: line })
export const addPolygon = (polygon) => ({ type: ADD_POLYGON, payload: polygon })

export const deletePoint = (index, subIndex) => ({ type: DELETE_POINT, index: index, subIndex: subIndex })
export const deleteLine = (index, subIndex) => ({ type: DELETE_LINE, index: index, subIndex: subIndex })
export const deletePolygon = (index, subIndex) => ({ type: DELETE_POLYGON, index: index, subIndex: subIndex })