import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { TextField } from '../general/FormFields';
import { addPoint } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'

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
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <TextField name="num" type="number" label="Number of features" />
                <PropertiesEditor />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}