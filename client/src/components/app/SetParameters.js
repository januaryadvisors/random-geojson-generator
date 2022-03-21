import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mutateAsync } from "redux-query";
import { toast } from "react-toastify";
import { boundariesSelector } from '../../selectors/boundaries'
import { selectedPointsSelector, selectedLinesSelector, selectedPolygonsSelector } from '../../selectors/features'
import { generateGeoJSONQuery } from '../../actions/queries'
import { clearStore } from '../../actions/clearStore'
import { statusIsGood } from '../../utils/helpers'
import { Header } from './Header'
import { Footer } from './Footer'
import deleteIcon from '../../assets/trash.svg'
import { deleteCoordinate } from '../../actions/boundaries';

const SelectedBBOX = (props) => {
    // need to find a way to update selectedBBOX coordinate
    const dispatch = useDispatch();

    return (
        <div>
            <h3>Bounding Box</h3>
            <div>
                <strong id="boundingBoxList">Min Longitude: </strong>{props.selectedBBOX.minLng}
                <img class="delete-button" hidden={props.selectedBBOX.minLng === ""} src={deleteIcon} alt="delete-icon" onClick={() => dispatch(deleteCoordinate("minLng"))} />
            </div>
            <div>
                <strong id="boundingBoxList">Min Latitude: </strong>{props.selectedBBOX.minLat}
                <img class="delete-button" hidden={props.selectedBBOX.minLat === ""} src={deleteIcon} alt="delete-icon" onClick={() => dispatch(deleteCoordinate("minLat"))} />
            </div>
            <div>
                <strong id="boundingBoxList">Max Longitude: </strong>{props.selectedBBOX.maxLng}
                <img class="delete-button" hidden={props.selectedBBOX.maxLng === ""} src={deleteIcon} alt="delete-icon" onClick={() => dispatch(deleteCoordinate("maxLng"))} />
            </div>
            <div>
                <strong id="boundingBoxList">Max Latitude: </strong>{props.selectedBBOX.maxLat}
                <img class="delete-button" hidden={props.selectedBBOX.maxLat === ""} src={deleteIcon} alt="delete-icon" onClick={() => dispatch(deleteCoordinate("maxLat"))} />
            </div>
        </div>
    )
}

const SelectedPointsTable = (props) => {
    return (
        <div>
            <h3>Selected Points</h3>
            <table rules="all">
                <thead>
                    <tr>
                        <th rowSpan="2"># of Features</th>
                        <th colSpan="5">Properties</th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Values</th>
                        <th>Min</th>
                        <th>Max</th>
                    </tr>
                </thead>
                <tbody>
                    {props.selectedPoints.length > 0 ? props.selectedPoints.map((feature, i) => {
                        return <>
                            <tr key={`pointRow${i}`}>
                                <td rowSpan={feature.propertyOptions.length + 1}>{feature.num}</td>
                            </tr>
                            {feature.propertyOptions.length > 0 ? feature.propertyOptions.map((propertyOption, n) => { return <tr key={`pointPropertyRow${i}${n}`}>
                                <td>{propertyOption.name}</td>
                                <td>{propertyOption.type}</td>
                                <td>{propertyOption.values}</td>
                                <td>{propertyOption.min}</td>
                                <td>{propertyOption.max}</td>
                                </tr>
                            }) : <><td></td><td></td></>}
                        </>
                    }) : <tr><td><br/></td><td colSpan="5"></td></tr>}
                </tbody>
            </table>
        </div>
    )
}

const SelectedLinesTable = (props) => {
    return (
        <div>
            <h3>Selected Lines</h3>
            <table rules="all">
                <thead>
                    <tr>
                        <th rowSpan="2"># of Features</th>
                        <th rowSpan="2"># of Vertices</th>
                        <th rowSpan="2">Max Segment Length</th>
                        <th rowSpan="2">Max Segment Rotation</th>
                        <th colSpan="5">Properties</th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Values</th>
                        <th>Min</th>
                        <th>Max</th>
                    </tr>
                </thead>
                <tbody>
                    {props.selectedLines.length > 0 ? props.selectedLines.map((feature, i) => {
                        return <>
                            <tr key={`lineRow${i}`}>
                                <td rowSpan={feature.propertyOptions.length + 1}>{feature.num}</td>
                                <td rowSpan={feature.propertyOptions.length + 1}>{feature.numVertices}</td>
                                <td rowSpan={feature.propertyOptions.length + 1}>{feature.maxSegmentLength}</td>
                                <td rowSpan={feature.propertyOptions.length + 1}>{feature.maxSegmentRotation}</td>
                            </tr>
                            {feature.propertyOptions.length > 0 ? feature.propertyOptions.map((propertyOption, n) => { return <tr key={`linePropertyRow${i}${n}`}>
                                <td>{propertyOption.name}</td>
                                <td>{propertyOption.type}</td>
                                <td>{propertyOption.values}</td>
                                <td>{propertyOption.min}</td>
                                <td>{propertyOption.max}</td>
                                </tr>
                            }) : <><td></td><td></td></>}
                        </>
                    }) : <tr><td><br/></td><td></td><td></td><td></td><td colSpan="5"></td></tr>}
                </tbody>
            </table>
        </div>
    )
}

const SelectedPolygonsTable = (props) => {
    return (
        <div>
            <h3>Selected Polygons</h3>
            <table rules="all">
                <thead>
                    <tr>
                        <th rowSpan="2"># of Features</th>
                        <th rowSpan="2"># of Vertices</th>
                        <th rowSpan="2">Max Radial Length</th>
                        <th colSpan="5">Properties</th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Values</th>
                        <th>Min</th>
                        <th>Max</th>
                    </tr>
                </thead>
                <tbody>
                    {props.selectedPolygons.length > 0 ? props.selectedPolygons.map((feature, i) => {
                        return <>
                            <tr key={`polygonRow${i}`}>
                                <td rowSpan={feature.propertyOptions.length + 1}>{feature.num}</td>
                                <td rowSpan={feature.propertyOptions.length + 1}>{feature.numVertices}</td>
                                <td rowSpan={feature.propertyOptions.length + 1}>{feature.maxRadialLength}</td>
                            </tr>
                            {feature.propertyOptions.length > 0 ? feature.propertyOptions.map((propertyOption, n) => { return <tr key={`polygonPropertyRow${i}${n}`}>
                                <td>{propertyOption.name}</td>
                                <td>{propertyOption.type}</td>
                                <td>{propertyOption.values}</td>
                                <td>{propertyOption.min}</td>
                                <td>{propertyOption.max}</td>
                                </tr>
                            }) : <><td></td><td></td></>}
                        </>
                    }) : <tr><td><br/></td><td></td><td></td><td colSpan="5"></td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export const SetParameters = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const selectedBBOX = useSelector(boundariesSelector);
    // const state = useSelector(state => state);
    // console.log(state);
    const selectedPoints = useSelector(selectedPointsSelector);
    const selectedLines = useSelector(selectedLinesSelector);
    const selectedPolygons = useSelector(selectedPolygonsSelector);

    const noDataEntered = () => {
        return selectedBBOX.maxLat === "" && selectedBBOX.maxLng === "" && selectedBBOX.minLat === "" && selectedBBOX.minLng === "" && selectedPoints.length === 0 && selectedLines.length === 0 && selectedPolygons.length === 0
    }

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
            <Header />
            
            <SelectedBBOX selectedBBOX={selectedBBOX} />
            <button onClick={() => history.push('/set-bbox')}>Set Bounding Box</button>

            <SelectedPointsTable selectedPoints={selectedPoints} />
            <button onClick={() => history.push('/add-points')}>Add Points</button>

            <SelectedLinesTable selectedLines={selectedLines} />
            <button onClick={() => history.push('/add-lines')}>Add Lines</button>

            <SelectedPolygonsTable selectedPolygons={selectedPolygons} />
            <button onClick={() => history.push('/add-polygons')}>Add Polygons</button>
            
            <div>
                <button disabled={noDataEntered()} onClick={() => dispatch(clearStore())}>Reset</button>
                <button id="generateButton" onClick={useGenerateGeoJSONQuery(selectedBBOX, selectedPoints, selectedLines, selectedPolygons)}>Generate GeoJSON</button>
            </div>

            <Footer />
        </>
    )
}