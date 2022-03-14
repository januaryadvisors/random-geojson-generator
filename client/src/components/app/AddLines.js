import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addLine } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'
import { Header } from './Header'
import { Footer } from './Footer'

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
        <Header />
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <strong htmlFor="num">Number of Features: </strong>
                <Field id="fieldSmall" name="num" type="number" />
                <strong htmlFor="numVertices">Number of Vertices: </strong>
                <Field id="fieldSmall" name="numVertices" type="number" />
                <strong htmlFor="maxSegmentLength">Max Segment Length: </strong>
                <Field id="fieldSmall" name="maxSegmentLength" type="number" />
                <strong htmlFor="maxSegmentRotation">Max Segment Rotation: </strong>
                <Field id="fieldSmall" name="maxSegmentRotation" type="number" />
                <PropertiesEditor />
                <button id="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        <Footer />
        </>
    )
}