import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addPolygon } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'
import { Header } from './Header'
import { Footer } from './Footer'
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
        <Header />
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <strong id="param" htmlFor="num">Number of Features: </strong>
                <div class="tooltip">
                    <img src={infoImage} alt="info" />
                    <span class="tooltiptext">Number of polygons to be added to the GeoJSON</span>
                </div>
                <Field id="fieldSmall" name="num" type="number" />

                <strong id="param" htmlFor="numVertices">Number of Vertices: </strong>
                <div class="tooltip">
                    <img src={infoImage} alt="info" />
                    <span class="tooltiptext">Number of coordinates each line will contain</span>
                </div>
                <Field id="fieldSmall" name="numVertices" type="number" />

                <strong id="param" htmlFor="maxRadialLength">Max Radial Length: </strong>
                <div class="tooltip">
                    <img src={infoImage} alt="info" />
                    <span class="tooltiptext">Max number of decimal degrees latitude or longitude that a vertex can reach out of the center of the polygon</span>
                </div>
                <Field id="fieldSmall" name="maxRadialLength" type="number" />
                <PropertiesEditor />
                <button id="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        <Footer />
        </>
    )
}