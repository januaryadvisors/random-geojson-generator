import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addLine } from '../../actions/features'

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
    }

    // need to add validation
    return (
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <label htmlFor="num">Number of Features: </label>
                <Field name="num" type="number" />
                <label htmlFor="numVertices">Number of Vertices: </label>
                <Field name="numVertices" type="number" />
                <label htmlFor="maxSegmentLength">Max Segment Length: </label>
                <Field name="maxSegmentLength" type="number" />
                <label htmlFor="maxSegmentRotation">Max Segment Rotation: </label>
                <Field name="maxSegmentRotation" type="number" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}