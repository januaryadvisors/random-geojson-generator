import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addPolygon } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'
import infoImage from '../../assets/info.svg'
import { errorHandling } from './ErrorHandling'

export const AddPolygons = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        if (errorHandling(values)) {
            dispatch(addPolygon(values))
            history.push('/')
        }
    }

    const initValues = {
        type: 'Polygon',
        num: '',
        numVertices: '',
        maxRadialLength: '',
        propertyOptions: [{
            name: '',
            type: '',
            values: '',
            min: '',
            max: '',
        }],
    }

    // need to add validation
    return (
        <>
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <label htmlFor="num">Number of Features: </label>
                <div class="tooltip">
                    <img src={infoImage} alt="Number of Feature Info Icon" />
                    <span class="tooltiptext">Number of polygons to be added to the GeoJSON</span>
                </div>
                <Field class="fieldSmall" name="num" type="number" />

                <label htmlFor="numVertices">Number of Vertices: </label>
                <div class="tooltip">
                    <img src={infoImage} alt="Number of Vertices Info Icon" />
                    <span class="tooltiptext">Number of coordinates each line will contain</span>
                </div>
                <Field class="fieldSmall" name="numVertices" type="number" />

                <label htmlFor="maxRadialLength">Max Radial Length: </label>
                <div class="tooltip">
                    <img src={infoImage} alt="Max Radial Length Info Icon" />
                    <span class="tooltiptext">Max number of decimal degrees latitude or longitude that a vertex can reach out of the center of the polygon</span>
                </div>
                <Field class="fieldSmall" name="maxRadialLength" type="number" />
                
                <PropertiesEditor />
                <button class="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        </>
    )
}