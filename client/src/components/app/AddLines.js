import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addLine } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'
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
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <label htmlFor="num">Number of Features: </label>
                <div class="tooltip">
                    <img src={infoImage} alt="Number of Features Info Icon" />
                    <span class="tooltiptext">Number of lines to be included in the GeoJSON</span>
                </div>
                <Field class="fieldSmall" name="num" type="number" />

                <label htmlFor="numVertices">Number of Vertices: </label>
                <div class="tooltip">
                    <img src={infoImage} alt="Number of Vertices Info Icon" />
                    <span class="tooltiptext">Number of coordinates each line will contain</span>
                </div>
                <Field class="fieldSmall" name="numVertices" type="number" />

                <label htmlFor="maxSegmentLength">Max Segment Length: </label>
                <div class="tooltip">
                    <img src={infoImage} alt="Max Segment Length Info Icon" />
                    <span class="tooltiptext">Max number of decimal degrees that a vertex can be from its predecessor</span>
                </div>
                <Field class="fieldSmall" name="maxSegmentLength" type="number" />

                <label htmlFor="maxSegmentRotation">Max Segment Rotation: </label>
                <div class="tooltip">
                    <img src={infoImage} alt="Max Segment Rotation Info Icon" />
                    <span class="tooltiptext">Max number of radians that a line segment can turn from the previous segment</span>
                </div>
                <Field class="fieldSmall" name="maxSegmentRotation" type="number" />

                <PropertiesEditor />
                <button class="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        </>
    )
}