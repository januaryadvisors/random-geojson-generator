import React from 'react';
import styled from 'styled-components';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mutateAsync } from "redux-query";
import { toast } from "react-toastify";
import { boundariesSelector } from '../../selectors/boundaries'
import { selectedPointsSelector, selectedLinesSelector, selectedPolygonsSelector } from '../../selectors/features'
import { generateGeoJSONQuery } from '../../actions/queries'
import { clearStore } from '../../actions/clearStore'
import { statusIsGood } from '../../utils/helpers'

const SelectedBBOX = (props) => {
    return (
        <div>
            <h2>Bounding Box</h2>
            <div>
                <strong>Min Longitude: </strong>{props.selectedBBOX.minLng}
            </div>
            <div>
                <strong>Min Latitude: </strong>{props.selectedBBOX.minLat}
            </div>
            <div>
                <strong>Max Longitude: </strong>{props.selectedBBOX.maxLng}
            </div>
            <div>
                <strong>Max Latitude: </strong>{props.selectedBBOX.maxLat}
            </div>
            
        </div>
    )
}

const SelectedPointsTable = (props) => {
    return (
        <div>
            <h2>Selected Points</h2>
            <table>
                <thead>
                    <tr>
                        <th># of Features</th>
                    </tr>
                </thead>
                <tbody>
                    {props.selectedPoints.length > 0 ? props.selectedPoints.map((feature, i) => {
                        return <tr key={`featureRow${i}`}>
                            <td>{feature.num}</td>
                        </tr>
                    }) : <tr><td></td></tr>}
                </tbody>
            </table>
        </div>
    )
}

const SelectedLinesTable = (props) => {
    return (
        <div>
            <h2>Selected Lines</h2>
            <table>
                <thead>
                    <tr>
                        <th># of Features</th>
                        <th># of Vertices</th>
                        <th>Max Segment Length</th>
                        <th>Max Segment Rotation</th>
                    </tr>
                </thead>
                <tbody>
                    {props.selectedLines.length > 0 ? props.selectedLines.map((feature, i) => {
                        return <tr key={`featureRow${i}`}>
                            <td>{feature.num}</td>
                            <td>{feature.numVertices}</td>
                            <td>{feature.maxSegmentLength}</td>
                            <td>{feature.maxSegmentRotation}</td>
                        </tr>
                    }) : <tr><td></td><td></td><td></td><td></td></tr>}
                </tbody>
            </table>
        </div>
    )
}

const SelectedPolygonsTable = (props) => {
    return (
        <div>
            <h2>Selected Polygons</h2>
            <table>
                <thead>
                    <tr>
                        <th># of Features</th>
                        <th># of Vertices</th>
                        <th>Max Radial Length</th>
                    </tr>
                </thead>
                <tbody>
                    {props.selectedPolygons.length > 0 ? props.selectedPolygons.map((feature, i) => {
                        return <tr key={`featureRow${i}`}>
                            <td>{feature.num}</td>
                            <td>{feature.numVertices}</td>
                            <td>{feature.maxRadialLength}</td>
                        </tr>
                    }) : <tr><td></td><td></td><td></td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export const SetParameters = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const selectedBBOX = useSelector(boundariesSelector)
    const selectedPoints = useSelector(selectedPointsSelector);
    const selectedLines = useSelector(selectedLinesSelector);
    const selectedPolygons = useSelector(selectedPolygonsSelector);

    const useGenerateGeoJSONQuery = (bbox, points, lines, polygons) => () => {
        dispatch(mutateAsync(generateGeoJSONQuery(bbox, points, lines, polygons))).then(({ status, body }) => {
            if (statusIsGood(status) && body) {
                var filename = 'randomGeoJSON.geojson'
                var blob = new Blob([JSON.stringify(body.featureCollection)], {type:'application/json'})
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, filename)
                } else {
                    var link = document.createElement("a");
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", filename);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
                dispatch(clearStore())
                toast.success("Success! GeoJSON file generated.")
            } else {
                toast.error("Error. Could not generate GeoJSON file.")
            }
        });
    }

    return (
        <>
            <div>
                <button onClick={useGenerateGeoJSONQuery(selectedBBOX, selectedPoints, selectedLines, selectedPolygons)}>Generate GeoJSON</button>
            </div>

            <SelectedBBOX selectedBBOX={selectedBBOX} />
            <button onClick={() => history.push('/set-bbox')}>Set Bounding Box</button>

            <SelectedPointsTable selectedPoints={selectedPoints} />
            <button onClick={() => history.push('/add-points')}>Add Points</button>
            <SelectedLinesTable selectedLines={selectedLines} />
            <button onClick={() => history.push('/add-lines')}>Add Lines</button>
            <SelectedPolygonsTable selectedPolygons={selectedPolygons} />
            <button onClick={() => history.push('/add-polygons')}>Add Polygons</button>
        </>
    )
}