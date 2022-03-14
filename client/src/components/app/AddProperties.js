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
                                <strong htmlFor={`propertyOptions.${index}.name`}>Property Name: </strong>
                                <Field id="fieldMedium" name={`propertyOptions.${index}.name`} type="text" />
                                <strong htmlFor={`propertyOptions.${index}.type`}>Property Type: </strong>
                                <Field id="fieldMedium" name={`propertyOptions.${index}.type`} as="select">
                                    {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                                </Field>
                                <strong htmlFor={`propertyOptions.${index}.values`}>List of Values:</strong>
                                <Field id="fieldLarge" name={`propertyOptions.${index}.values`} />
                                <strong htmlFor={`propertyOptions.${index}.min`}>Min (length, words, #, etc): </strong>
                                <Field id="fieldMedium" name={`propertyOptions.${index}.min`} type="number" />
                                <strong htmlFor={`propertyOptions.${index}.max`}>Max (length, words, #, etc): </strong>
                                <Field id="fieldMedium" name={`propertyOptions.${index}.max`} type="number" />
                                
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