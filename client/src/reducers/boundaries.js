import { SET_BBOX, DELETE_COORDINATE } from '../actions/boundaries';

const defaultState = {
    minLng: '',
    minLat: '',
    maxLng: '',
    maxLat: '',
}

const boundariesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BBOX:
        return {
            minLng: action.payload.minLng,
            minLat: action.payload.minLat,
            maxLng: action.payload.maxLng,
            maxLat: action.payload.maxLat,
        }
    case DELETE_COORDINATE:
        return {
            ...state,
            [action.payload]: '',
        }
    default:
        return state;
  }
};

export default boundariesReducer;