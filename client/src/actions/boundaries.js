export const SET_BBOX = 'SET_BBOX'
export const DELETE_COORDINATE = 'DELETE_COORDINATE'

export const setBBOX = (bbox) => ({ type: SET_BBOX, payload: bbox })
export const deleteCoordinate = (coordinate) => ({ type: DELETE_COORDINATE, payload: coordinate })