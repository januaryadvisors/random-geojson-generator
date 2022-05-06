import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
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
            type: 'string_from_set',
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
                <PropertiesEditor />
                <button class="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        </>
    )
}