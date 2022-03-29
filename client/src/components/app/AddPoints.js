import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { addPoint } from '../../actions/features'
import { PropertiesEditor } from '../app/AddProperties'
import { errorHandling } from './ErrorHandling'
import infoImage from '../../assets/info.svg'

export const AddPoints = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        if (errorHandling(values)) {
            dispatch(addPoint(values))
            history.push('/')
        }
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
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <label htmlFor="num">Number of Features: </label>
                <div class="tooltip">
                    <img src={infoImage} alt="Number of Features Info Icon" />
                    <span class="tooltiptext">Number of point to be added to the GeoJSON</span>
                </div>
                <Field class="fieldSmall" name="num" type="number" />

                <PropertiesEditor />
                <button class="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        </>
    )
}