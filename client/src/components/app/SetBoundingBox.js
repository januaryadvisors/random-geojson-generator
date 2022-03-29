import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { setBBOX } from '../../actions/boundaries'
import { toast } from "react-toastify";

export const SetBoundingBox = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const submit = (values) => {
        if (values.minLng !== "" && values.maxLng !== "" && values.minLng > values.maxLng) {
            toast.error("Min Longitude cannot be larger than Max Longitude.")
        } else if (values.minLat !== "" && values.maxLat !== "" && values.minLat > values.maxLat) {
            toast.error("Min Latitude cannot be larger than Max Latitude.")
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
        <Formik
            // validate={validate}
            initialValues={initValues}
            enableReinitialize={true}
            onSubmit={submit}
        >
            <Form>
                <label htmlFor="minLng">Min Longitude: </label>
                <Field class="fieldSmall" name="minLng" type="number" />
                <label htmlFor="minLat">Min Latitude: </label>
                <Field class="fieldSmall" name="minLat" type="number" />
                <label htmlFor="maxLng">Max Longitude: </label>
                <Field class="fieldSmall" name="maxLng" type="number" />
                <label htmlFor="maxLat">Max Latitude: </label>
                <Field class="fieldSmall" name="maxLat" type="number" />
                <button class="greenButton" type="submit">Submit</button>
            </Form>
        </Formik>
        </>
    )
}