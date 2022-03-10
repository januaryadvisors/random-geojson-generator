import React from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'

export const PropertiesEditor = () => {
    // update
    const { values, errors, touched, submitCount } = useFormikContext();
    return (
        <FieldArray
            name="propertyOptions"
            render={arrayHelpers => (
                <div>
                    {values.propertyOptions.map((item, index) => {
                        const removeOption = () => { 
                            arrayHelpers.remove(index); 
                        }
                        return (
                            <>
                                <label htmlFor={`propertyOptions.${index}.name`}>Property Name: </label>
                                <Field name={`propertyOptions.${index}.name`} type="text" />
                                <label htmlFor={`propertyOptions.${index}.type`}>Property Type: </label>
                                <Field name={`propertyOptions.${index}.type`} as="select">
                                    {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                                </Field>
                                <label htmlFor={`propertyOptions.${index}.values`}>List of Values:</label>
                                <Field name={`propertyOptions.${index}.values`} as='textarea' />
                                <label htmlFor={`propertyOptions.${index}.min`}>Min (length, words, #, etc): </label>
                                <Field name={`propertyOptions.${index}.min`} type="number" />
                                <label htmlFor={`propertyOptions.${index}.max`}>Max (length, words, #, etc): </label>
                                <Field name={`propertyOptions.${index}.max`} type="number" />

                                <div>
                                    <button type="button" onClick={removeOption}>Remove Property</button>
                                </div>
                            </>
                        );
                        })
                    }
                    <button type="button" onClick={() => arrayHelpers.push({name: "", type: "", values: "", min: "", max: ""})}>Add Property</button>
                </div>
            )}
        />

    )
}