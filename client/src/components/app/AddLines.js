import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { TextField } from '../general/FormFields';
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
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <TextField name="num" type="number" label="Number of features" />
                <TextField name="numVertices" type="number" label="Number of vertices" />
                <TextField name="maxSegmentLength" type="number" label="Max segment length" />
                <TextField name="maxSegmentRotation" type="number" label="Max segment rotation" />
                <PropertiesEditor />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}