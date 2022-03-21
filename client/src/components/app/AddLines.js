import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addLine } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'

export const AddLines = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        dispatch(addLine(values))
        history.push('/')
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
                <Field class="fieldSmall" name="num" type="number" />
                <label htmlFor="numVertices">Number of Vertices: </label>
                <Field class="fieldSmall" name="numVertices" type="number" />
                <label htmlFor="maxSegmentLength">Max Segment Length: </label>
                <Field class="fieldSmall" name="maxSegmentLength" type="number" />
                <label htmlFor="maxSegmentRotation">Max Segment Rotation: </label>
                <Field class="fieldSmall" name="maxSegmentRotation" type="number" />
                <PropertiesEditor />
                <button class="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        </>
    )
}