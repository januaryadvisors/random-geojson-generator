import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { setBBOX } from '../../actions/boundaries'

export const SetBoundingBox = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        dispatch(setBBOX(values))
        history.push('/')
    }

    const initValues = {
        minLng: '',
        minLat: '',
        maxLng: '',
        maxLat: '',
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
                <label htmlFor="minLng">Min Longitude: </label>
                <Field name="minLng" type="number" />
                <label htmlFor="minLat">Min Latitude: </label>
                <Field name="minLat" type="number" />
                <label htmlFor="maxLng">Max Longitude: </label>
                <Field name="maxLng" type="number" />
                <label htmlFor="maxLat">Max Latitude: </label>
                <Field name="maxLat" type="number" />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}