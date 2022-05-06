import React from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'

export const PropertiesEditor = () => {
    // update
    const { values } = useFormikContext(); // errors, touched, submitCount
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
                                <Field class="fieldMedium" name={`propertyOptions.${index}.name`} type="text" />
                                <label htmlFor={`propertyOptions.${index}.type`}>Property Type: </label>
                                <Field class="fieldMedium" name={`propertyOptions.${index}.type`} as="select">
                                    {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                                </Field>
                                {['string_from_set', 'number_from_set'].includes(values.propertyOptions[index].type) ? (
                                    <>
                                        <label htmlFor={`propertyOptions.${index}.values`}>List of Values:</label>
                                        <Field name={`propertyOptions.${index}.values`} as='textarea' />
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor={`propertyOptions.${index}.min`}>Min (length, words, #, etc): </label>
                                        <Field class="fieldMedium" name={`propertyOptions.${index}.min`} type="number" />
                                        <label htmlFor={`propertyOptions.${index}.max`}>Max (length, words, #, etc): </label>
                                        <Field class="fieldMedium" name={`propertyOptions.${index}.max`} type="number" />
                                    </>
                                )}                                
                                <div>
                                    <button type="button" onClick={removeOption}>Remove Property</button>
                                </div>
                            </>
                        );
                        })
                    }
                    <button type="button" onClick={() => arrayHelpers.push({name: "", type: "string_from_set", values: "", min: "", max: ""})}>Add Property</button>
                </div>
            )}
        />

    )
}