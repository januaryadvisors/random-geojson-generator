import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addPolygon } from '../../actions/features'

export const AddPolygons = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        dispatch(addPolygon(values))
        history.push('/')
    }

    const initValues = {
        type: 'Polygon',
        num: '',
        numVertices: '',
        maxRadialLength: '',
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
                <label htmlFor="maxRadialLength">Max Radial Length: </label>
                <Field name="maxRadialLength" type="number" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}