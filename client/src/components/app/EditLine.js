import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'
import { useDispatch, useSelector } from 'react-redux';
import { addProperties, deleteProperties, editObject, deleteObject } from '../../actions/features';
import { useHistory } from 'react-router-dom';

export const EditLine = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state);
    
    // get index of current line
    const indexLine = state.features.index;

    // get current line
    const currentLine = state.features.lines[indexLine];

    const submit = (values) => {
        dispatch(editObject("line", indexLine, values));
        history.push('/');
    }

    const deleteLine = () => {
        dispatch(deleteObject("line", indexLine));
        history.push('/');
    }

    return (
        <>    
            <Formik initialValues={currentLine} onSubmit={submit}>
                <Form>
                    <label htmlFor="num">Number of Features: </label>
                    <Field class="fieldSmall" name="num" type="number" />

                    <label htmlFor="numVertices">Number of Vertices: </label>
                    <Field class="fieldSmall" name="numVertices" type="number" />
                    
                    <label htmlFor="maxSegmentLength">Max Segment Length: </label>
                    <Field class="fieldSmall" name="maxSegmentLength" type="number" />

                    <label htmlFor="maxSegmentRotation">Max Segment Rotation: </label>
                    <Field class="fieldSmall" name="maxSegmentRotation" type="number" />

                    <FieldArray name="propertyOptions" render={() => (
                        <div>
                            {currentLine.propertyOptions.map((item, index) => {
                                const removeOption = () => { 
                                    dispatch(deleteProperties("line", indexLine, index));
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
                            <button type="button" onClick={() => dispatch(addProperties("line", indexLine))}>Add Property</button>
                        </div>
                        )}
                    />
                    <div class="inlineButtons">
                        <button class="redButton" type="button" onClick={deleteLine}>Delete Line</button>
                        <button class="greenButton" type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}