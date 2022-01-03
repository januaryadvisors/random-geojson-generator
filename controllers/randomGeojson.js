const turf = require('@turf/random');

exports.generateGeojson = (req, res, next) => {
    const  {
        bbox,
        points,
        lines,
        polygons,
    } = req.body

    let features = []

    let options = {}
    // this will fail if they enter 0 as a coordinate right now
    if (bbox.minLng && bbox.minLat && bbox.maxLng && bbox.maxLat) {
        const bbox = [parseFloat(bbox.minLng), parseFloat(bbox.minLat), parseFloat(bbox.maxLng), parseFloat(bbox.maxLat)]
        options['bbox'] = bbox
    }

    if (points.length > 0) {
        points.forEach(point => {
            let pointOptions = { ...options }
            const randomPoints = turf.randomPoint(point.num, pointOptions)
            features.push(...randomPoints.features)
        })
        
    }

    if (lines.length > 0) {
        lines.forEach(line => {
            let lineStringOptions = { ...options }
            if (line.numVertices) {
                lineStringOptions['num_vertices'] = line.numVertices
            }
            if (line.maxSegmentLength) {
                lineStringOptions['max_length'] = line.maxSegmentLength
            }
            if (line.maxSegmentRotation) {
                lineStringOptions['max_rotation'] = line.maxSegmentRotation
            }
            const randomLineStrings = turf.randomLineString(line.num, lineStringOptions)
            features.push(...randomLineStrings.features)
        })
    }

    if (polygons.length > 0) {
        polygons.forEach(polygon => {
            let polygonOptions = { ...options }
            if (polygon.numVertices) {
                polygonOptions['num_vertices'] = polygon.numVertices
            }
            if (polygon.maxRadialLength) {
                polygonOptions['max_radial_length'] = polygon.maxRadialLength
            }
            const randomPolygons = turf.randomPolygon(polygon.num, polygonOptions)
            features.push(...randomPolygons.features)
        })
    }

    const featureCollection = {
        "type": "FeatureCollection",
        "features": features
    }
    res.status(200).json({featureCollection: featureCollection})
}