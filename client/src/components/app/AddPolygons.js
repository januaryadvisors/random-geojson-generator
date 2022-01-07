import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { TextField } from '../general/FormFields';
import { addPolygon } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'

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
                <TextField name="numVertices" type="number" label="Number of vertices" />
                <TextField name="maxRadialLength" type="number" label="Max radial length" />
                <PropertiesEditor />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}