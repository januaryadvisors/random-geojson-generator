import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addPoint } from '../../actions/features'

export const AddPoints = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        dispatch(addPoint(values))
        history.push('/')
    }

    const initValues = {
        type: 'Point',
        num: '',
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
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}