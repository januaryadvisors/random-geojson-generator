import React from 'react';
import { Formik, Form, Field } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'
import { useDispatch } from 'react-redux';
import { editPoint } from '../../actions/features';
import { useHistory } from 'react-router-dom';


export const EditPoint = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [index, subIndex] = ["HOLA", "ADIOS"]; // grab index/subIndex from dispatch state
    console.log(index, subIndex);
    

    const submit = (properties) => {
        dispatch(editPoint(index, subIndex, properties))
        history.push('/');
    }

    const properties = {
        name: '',
        type: '',
        values: '',
        min: '',
        max: '',
    }

    return (   
        <>    
            <Formik>
                <Form>
                    <label>Property Name: </label>
                    <Field class="fieldMedium" name={properties.name} type="text" />
                </Form>
            </Formik>
            
            <Formik>
                <Form>
                    <label>Property Type: </label>
                    <Field class="fieldMedium" name={properties.type} as="select">
                        {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                    </Field>
                </Form>
            </Formik>

            <Formik>
                <Form>
                    <label>List of Values:</label>
                    <Field name={properties.values} as='textarea' />
                </Form>
            </Formik>
            
            <Formik>
                <Form>
                    <label>Min (length, words, #, etc): </label>
                    <Field class="fieldMedium" name={properties.min} type="number" />
                </Form>
            </Formik>
            
            <Formik>
                <Form>
                    <label>Max (length, words, #, etc): </label>
                    <Field class="fieldMedium" name={properties.max} type="number" />
                </Form>
            </Formik>
            
            <div>
                <button class="greenButton" onClick={() => submit(properties)}>Submit</button>
            </div>
        </>
    )
}