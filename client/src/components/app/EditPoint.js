import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProperties, addProperties, editPoint } from '../../actions/features';
import { useHistory } from 'react-router-dom';
import { propertyTypeOptions } from '../../constants/formOptions';

export const EditPoint = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state);

    // get index of current point
    const indexPoint = state.features.index;
    
    // get current point
    const currentPoint = state.features.points[indexPoint];

    const submit = (values) => {
        dispatch(editPoint(indexPoint, values));
        history.push('/');
    }

    return (   
        <>    
            <Formik initialValues={currentPoint} onSubmit={submit}>
                <Form>
                    <label htmlFor="num">Number of Features:</label>
                    <Field class="fieldSmall" name="num" type="number" />

                    <FieldArray name="propertyOptions" render={() => (
                        <div>
                            {currentPoint.propertyOptions.map((item, index) => {
                                const removeOption = () => { 
                                    dispatch(deleteProperties(indexPoint, index));
                                    console.log(currentPoint)
                                }
                                return (
                                    <>
                                        <label htmlFor={`propertyOptions.${index}.name`}>Property Name: </label>
                                        <Field class="fieldMedium" name={`propertyOptions.${index}.name`} type="text" />
                                        
                                        <label htmlFor={`propertyOptions.${index}.type`}>Property Type: </label>
                                        <Field class="fieldMedium" name={`propertyOptions.${index}.type`} as="select">
                                            {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                                        </Field>

                                        <label htmlFor={`propertyOptions.${index}.values`}>List of Values:</label>
                                        <Field name={`propertyOptions.${index}.values`} as='textarea' />
                                        
                                        <label htmlFor={`propertyOptions.${index}.min`}>Min (length, words, #, etc): </label>
                                        <Field class="fieldMedium" name={`propertyOptions.${index}.min`} type="number" />
                                        
                                        <label htmlFor={`propertyOptions.${index}.max`}>Max (length, words, #, etc): </label>
                                        <Field class="fieldMedium" name={`propertyOptions.${index}.max`} type="number" />

                                        <div>
                                            <button type="button" onClick={removeOption}>Remove Property</button>
                                        </div>
                                    </>
                                );
                                })
                            }
                            <button type="button" onClick={() => dispatch(addProperties(indexPoint))}>Add Property</button>
                        </div>
                        )}
                    />
                    <div>
                        <button class="greenButton" type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}