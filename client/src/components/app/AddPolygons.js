import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addPolygon } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'
import { Header } from './Header'
import { Footer } from './Footer'

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
                <strong htmlFor="maxRadialLength">Max Radial Length: </strong>
                <Field id="fieldSmall" name="maxRadialLength" type="number" />
                <PropertiesEditor />
                <button id="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        <Footer />
        </>
    )
}