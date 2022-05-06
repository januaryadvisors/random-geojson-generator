import React from 'react';
import { Formik, Form, Field } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'
import { useDispatch, useSelector } from 'react-redux';
import { editPoint } from '../../actions/features';
import { useHistory } from 'react-router-dom';

export const EditPoint = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state);
    
    // get index/subIndex from dispatch state
    const [index, subIndex] = [state.features.index, state.features.subIndex];
    
    // get point from dispatch state
    const currentProperty = state.features.points[index].propertyOptions[subIndex];

    const submit = (values) => {
        dispatch(editPoint(index, subIndex, values));
        history.push('/');
    }

    const properties = {
        name: currentProperty.name,
        type: currentProperty.type,
        values: currentProperty.values,
        min: currentProperty.min,
        max: currentProperty.max,
    }

    return (   
        <>    
            <Formik initialValues={properties} onSubmit={submit}>
                <Form>
                    <label htmlFor="name">Property Name: </label>
                    <Field class="fieldMedium" name="name" type="text" />

                    <label htmlFor="type">Property Type: </label>
                    <Field class="fieldMedium" name="type" as="select">
                        {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                    </Field>

                    <label htmlFor="values">List of Values:</label>
                    <Field name="values" as='textarea' />

                    <label htmlFor="min">Min (length, words, #, etc): </label>
                    <Field class="fieldMedium" name="min" type="number" />

                    <label htmlFor="max">Max (length, words, #, etc): </label>
                    <Field class="fieldMedium" name="max" type="number" />

                    <div>
                        <button class="greenButton" type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}