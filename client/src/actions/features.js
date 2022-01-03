export const ADD_POINT = 'ADD_POINT';
export const ADD_LINE = 'ADD_LINE';
export const ADD_POLYGON = 'ADD_POLYGON';

export const addPoint = (point) => ({ type: ADD_POINT, payload: point })

export const addLine = (line) => ({ type: ADD_LINE, payload: line })

export const addPolygon = (polygon) => ({ type: ADD_POLYGON, payload: polygon })