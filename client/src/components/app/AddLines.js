import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addLine } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'
import { Header } from './Header'
import { Footer } from './Footer'
import infoImage from '../../assets/info.svg'
import { errorHandling } from './ErrorHandling'


export const AddLines = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        if (errorHandling(values)) {
            dispatch(addLine(values))
            history.push('/')
        }
    }

    const initValues = {
        type: 'Line',
        num: '',
        numVertices: '',
        maxSegmentLength: '',
        maxSegmentRotation: '',
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
                    <span class="tooltiptext">Number of lines to be included in the GeoJSON</span>
                </div>
                <Field id="fieldSmall" name="num" type="number" />

                <strong id="param" htmlFor="numVertices">Number of Vertices: </strong>
                <div class="tooltip">
                    <img src={infoImage} alt="info" />
                    <span class="tooltiptext">Number of coordinates each line will contain</span>
                </div>
                <Field id="fieldSmall" name="numVertices" type="number" />

                <strong id="param" htmlFor="maxSegmentLength">Max Segment Length: </strong>
                <div class="tooltip">
                    <img src={infoImage} alt="info" />
                    <span class="tooltiptext">Max number of decimal degrees that a vertex can be from its predecessor</span>
                </div>
                <Field id="fieldSmall" name="maxSegmentLength" type="number" />

                <strong id="param" htmlFor="maxSegmentRotation">Max Segment Rotation: </strong>
                <div class="tooltip">
                    <img src={infoImage} alt="info" />
                    <span class="tooltiptext">Max number of radians that a line segment can turn from the previous segment</span>
                </div>
                <Field id="fieldSmall" name="maxSegmentRotation" type="number" />
                <PropertiesEditor />
                <button id="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        <Footer />
        </>
    )
}