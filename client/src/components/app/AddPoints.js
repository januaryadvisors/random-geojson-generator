import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addPoint } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'
import { Header } from './Header'
import { Footer } from './Footer'

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
                <PropertiesEditor />
                <button id="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        <Footer />
        </>
    )
}