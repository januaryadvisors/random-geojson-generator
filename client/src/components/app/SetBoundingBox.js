import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { setBBOX } from '../../actions/boundaries'
import { toast } from "react-toastify";
import { Header } from './Header'
import { Footer } from './Footer'

export const SetBoundingBox = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        if (values.minLng !== "" && values.maxLng !== "" && values.minLng > values.maxLng) {
            toast.error("Error. Min Longitude cannot be larger than Max Longitude.")
        } else if (values.minLat !== "" && values.maxLat !== "" && values.minLat > values.maxLat) {
            toast.error("Error. Min Latitude cannot be larger than Max Latitude.")
        } else {
            dispatch(setBBOX(values))
            history.push('/')
        }
    }

    const initValues = {
        minLng: '',
        minLat: '',
        maxLng: '',
        maxLat: '',
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
                <strong htmlFor="minLng">Min Longitude: </strong>
                <Field id="fieldSmall" name="minLng" type="number" />
                <strong htmlFor="minLat">Min Latitude: </strong>
                <Field id="fieldSmall" name="minLat" type="number" />
                <strong htmlFor="maxLng">Max Longitude: </strong>
                <Field id="fieldSmall" name="maxLng" type="number" />
                <strong htmlFor="maxLat">Max Latitude: </strong>
                <Field id="fieldSmall" name="maxLat" type="number" />
                <button id="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        <Footer />
        </>
    )
}