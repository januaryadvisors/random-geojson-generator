export const ADD_POINT = 'ADD_POINT';
export const ADD_LINE = 'ADD_LINE';
export const ADD_POLYGON = 'ADD_POLYGON';

export const EDIT_POINT = 'EDIT_POINT';
export const EDIT_LINE = 'EDIT_LINE';
export const EDIT_POLYGON = 'EDIT_POLYGON';

export const addPoint = (point) => ({ type: ADD_POINT, payload: point })
export const addLine = (line) => ({ type: ADD_LINE, payload: line })
export const addPolygon = (polygon) => ({ type: ADD_POLYGON, payload: polygon })

export const editPoint = (index, subIndex) => ({ type: EDIT_POINT, index: index, subIndex: subIndex})
export const editLine = (index, subIndex) => ({ type: EDIT_LINE, index: index, subIndex: subIndex})
export const editPolygon = (index, subIndex) => ({ type: EDIT_POLYGON, index: index, subIndex: subIndex})