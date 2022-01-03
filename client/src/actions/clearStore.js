export const CLEAR_STORE = 'CLEAR_STORE';

// Tells the root reducer to completely clear the redux store, used for 401 encounters
export const clearStore = () => ({ type: CLEAR_STORE, payload: true })
