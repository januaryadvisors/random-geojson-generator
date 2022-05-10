export const ADD_POINT = 'ADD_POINT';
export const ADD_LINE = 'ADD_LINE';
export const ADD_POLYGON = 'ADD_POLYGON';

export const EDIT_POINT = 'EDIT_POINT';
export const EDIT_LINE = 'EDIT_LINE';
export const EDIT_POLYGON = 'EDIT_POLYGON';

export const DELETE_PROPERTIES = 'DELETE_PROPERTIES';
export const ADD_PROPERTIES = 'ADD_PROPERTIES';

export const SET_INDEX = 'SET_INDEX';

export const addPoint = (point) => ({ type: ADD_POINT, payload: point })
export const addLine = (line) => ({ type: ADD_LINE, payload: line })
export const addPolygon = (polygon) => ({ type: ADD_POLYGON, payload: polygon })

export const setIndex = (index) => ({ type: SET_INDEX, index: index })
export const editPoint = (index, properties) => ({ type: EDIT_POINT, index: index, properties: properties })
export const editLine = (index, subIndex, properties) => ({ type: EDIT_LINE, index: index, subIndex: subIndex, properties: properties })
export const editPolygon = (index, subIndex, properties) => ({ type: EDIT_POLYGON, index: index, subIndex: subIndex, properties: properties })

export const deleteProperties = (index, subIndex) => ({ type: DELETE_PROPERTIES, index: index, subIndex: subIndex });
export const addProperties = (index) => ({ type: ADD_PROPERTIES, index: index });