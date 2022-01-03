const API_ROOT = '/api';

export const generateGeoJSONQuery = (bbox, points, lines, polygons) => ({
    url: `${API_ROOT}/generate-geojson`,
    options: { method: 'POST' },
    body: { bbox, points, lines, polygons }
});