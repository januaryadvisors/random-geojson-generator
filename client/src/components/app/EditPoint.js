import React from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'

export const EditPoint = () => {
    // const { values } = useFormikContext();
    return (   
        <>    
            <Formik>
                <Form>
                    <label>Property Name: </label>
                    <Field class="fieldMedium" type="number" />
                </Form>
            </Formik>
            
            <Formik>
                <Form>
                    <label>Property Type: </label>
                    <Field class="fieldMedium" as="select">
                        {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                    </Field>
                </Form>
            </Formik>

            <Formik>
                <Form>
                    <label>List of Values:</label>
                    <Field as='textarea' />
                </Form>
            </Formik>
            
            <Formik>
                <Form>
                    <label>Min (length, words, #, etc): </label>
                    <Field class="fieldMedium" type="number" />
                </Form>
            </Formik>
            
            <Formik>
                <Form>
                    <label>Max (length, words, #, etc): </label>
                    <Field class="fieldMedium" type="number" />
                </Form>
            </Formik>
            
            <div>
                <button type="button">Edit Point</button>
            </div>
        </>
    )
}