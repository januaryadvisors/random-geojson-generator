import { createSelector } from 'reselect';

export const selectedPointsSelector = (state) => state.features.points || [];
export const selectedLinesSelector = (state) => state.features.lines || [];
export const selectedPolygonsSelector = (state) => state.features.polygons || [];