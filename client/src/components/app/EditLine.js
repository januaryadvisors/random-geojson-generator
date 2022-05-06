import React from 'react';
import { Formik, Form, Field } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'
import { useDispatch, useSelector } from 'react-redux';
import { editLine } from '../../actions/features';
import { useHistory } from 'react-router-dom';

export const EditLine = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state);
    
    // get index/subIndex from dispatch state
    const [index, subIndex] = [state.features.index, state.features.subIndex];
    
    // get lines from dispatch state
    const currentNumVertices = state.features.lines[index].numVertices;
    const currentMaxSegmentLength = state.features.lines[index].maxSegmentLength;
    const currentMaxSegmentRotation = state.features.lines[index].maxSegmentRotation;
    const currentProperties = state.features.lines[index].propertyOptions[subIndex];

    const submit = (values) => {
        dispatch(editLine(index, subIndex, values));
        history.push('/');
    }

    const properties = {
        numVertices: currentNumVertices,
        maxSegmentLength: currentMaxSegmentLength,
        maxSegmentRotation: currentMaxSegmentRotation,
        name: currentProperties.name,
        type: currentProperties.type,
        values: currentProperties.values,
        min: currentProperties.min,
        max: currentProperties.max,
    }

    return (
        <>    
            <Formik initialValues={properties} onSubmit={submit}>
                <Form>
                    <label htmlFor="numVertices"># of Vertices: </label>
                    <Field class="fieldSmall" name="numVertices" type="text" />
                    
                    <label htmlFor="maxSegmentLength">Max Segment Length: </label>
                    <Field class="fieldSmall" name="maxSegmentLength" type="text" />

                    <label htmlFor="maxSegmentRotation">Max Segment Rotation: </label>
                    <Field class="fieldSmall" name="maxSegmentRotation" type="text" />

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