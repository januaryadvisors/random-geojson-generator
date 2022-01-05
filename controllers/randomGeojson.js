const turf = require('@turf/random');
const { generateFeatureProperties } = require('../utils/featureHelper')

exports.generateGeojson = (req, res, next) => {
    const  {
        bbox,
        points,
        lines,
        polygons,
    } = req.body

    let features = []

    let options = {}
    // set bounding box as option for all features if send in request
    // this will fail if they enter 0 as a coordinate right now
    if (bbox.minLng && bbox.minLat && bbox.maxLng && bbox.maxLat) {
        const bbox = [parseFloat(bbox.minLng), parseFloat(bbox.minLat), parseFloat(bbox.maxLng), parseFloat(bbox.maxLat)]
        options['bbox'] = bbox
    }

    if (points.length > 0) {
        points.forEach(point => {
            // set point options
            let pointOptions = { ...options }

            // generate random points
            const randomPointCollection = turf.randomPoint(point.num, pointOptions)
            
            // set custom properties for each feature
            let randomPoints = randomPointCollection.features
            if (point.propertyOptions) {
                randomPoints.forEach(randomPoint => {
                    const featureProperties = generateFeatureProperties(propertyOptions)
                    randomPoint.properties = featureProperties
                })
            }

            features.push(...randomPoints)
        })
        
    }

    if (lines.length > 0) {
        lines.forEach(line => {
            // set line string options
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

            // generate random line strings
            const randomLineStringCollection = turf.randomLineString(line.num, lineStringOptions)

            // set custom properties for each feature
            let randomLineStrings = randomLineStringCollection.features
            if (point.propertyOptions) {
                randomLineStrings.forEach(randomLineString => {
                    const featureProperties = generateFeatureProperties(propertyOptions)
                    randomLineString.properties = featureProperties
                })
            }

            features.push(...randomLineStrings)
        })
    }

    if (polygons.length > 0) {
        polygons.forEach(polygon => {
            // set polygon options
            let polygonOptions = { ...options }
            if (polygon.numVertices) {
                polygonOptions['num_vertices'] = polygon.numVertices
            }
            if (polygon.maxRadialLength) {
                polygonOptions['max_radial_length'] = polygon.maxRadialLength
            }

            // generate random polygons
            const randomPolygonCollection = turf.randomPolygon(polygon.num, polygonOptions)

            // set custom properties for each feature
            let randomPolygons = randomPolygonCollection.features
            if (point.propertyOptions) {
                randomPolygons.forEach(randomPolygon => {
                    const featureProperties = generateFeatureProperties(propertyOptions)
                    randomPolygon.properties = featureProperties
                })
            }

            features.push(...randomPolygons)
        })
    }

    const featureCollection = {
        "type": "FeatureCollection",
        "features": features
    }
    res.status(200).json({featureCollection: featureCollection})
}