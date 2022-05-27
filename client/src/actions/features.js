export const ADD_POINT = 'ADD_POINT';
export const ADD_LINE = 'ADD_LINE';
export const ADD_POLYGON = 'ADD_POLYGON';
export const SET_INDEX = 'SET_INDEX';
export const EDIT_OBJECT = 'EDIT_OBJECT';
export const DELETE_OBJECT = 'DELETE_OBJECT';
export const DELETE_PROPERTIES = 'DELETE_PROPERTIES';
export const ADD_PROPERTIES = 'ADD_PROPERTIES';

export const addPoint = (point) => ({ type: ADD_POINT, payload: point })
export const addLine = (line) => ({ type: ADD_LINE, payload: line })
export const addPolygon = (polygon) => ({ type: ADD_POLYGON, payload: polygon })

export const setIndex = (index) => ({ type: SET_INDEX, index: index })
export const editObject = (object, index, properties) => ({ type: EDIT_OBJECT, object: object, index: index, properties: properties })
export const deleteObject = (object, index) => ({ type: DELETE_OBJECT, object: object, index: index })

export const deleteProperties = (object, index, subIndex) => ({ type: DELETE_PROPERTIES, object: object, index: index, subIndex: subIndex });
export const addProperties = (object, index) => ({ type: ADD_PROPERTIES, object: object, index: index });