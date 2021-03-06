import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
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
                <label htmlFor="maxRadialLength">Max Radial Length: </label>
                <Field class="fieldSmall" name="maxRadialLength" type="number" />
                <PropertiesEditor />
                <button class="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        </>
    )
}