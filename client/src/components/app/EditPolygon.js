import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'
import { useDispatch, useSelector } from 'react-redux';
import { addProperties, deleteProperties, editObject, deleteObject } from '../../actions/features';
import { useHistory } from 'react-router-dom';

export const EditPolygon = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state);
    
    // get index of current polygon
    const indexPolygon = state.features.index;

    // get polygon from dispatch state
    const currentPolygon = state.features.polygons[indexPolygon];

    const submit = (values) => {
        dispatch(editObject("polygon", indexPolygon, values));
        history.push('/');
    }

    const deletePolygon = () => {
        dispatch(deleteObject("polygon", indexPolygon));
        history.push('/');
    }

    return (
        <>    
            <Formik initialValues={currentPolygon} onSubmit={submit}>
                <Form>
                    <label htmlFor="num">Number of Features: </label>
                    <Field class="fieldSmall" name="num" type="number" />

                    <label htmlFor="numVertices">Number of Vertices: </label>
                    <Field class="fieldSmall" name="numVertices" type="number" />
                    
                    <label htmlFor="maxRadialLength">Max Radial Length: </label>
                    <Field class="fieldSmall" name="maxRadialLength" type="text" />

                    <FieldArray name="propertyOptions" render={() => (
                        <div>
                            {currentPolygon.propertyOptions.map((item, index) => {
                                const removeOption = () => { 
                                    dispatch(deleteProperties("polygon", indexPolygon, index));
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
                            <button type="button" onClick={() => dispatch(addProperties("polygon", indexPolygon))}>Add Property</button>
                        </div>
                        )}
                    />
                    <div class="inlineButtons">
                        <button class="redButton" type="button" onClick={deletePolygon}>Delete Polygon</button>
                        <button class="greenButton" type="submit">Submit</button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}