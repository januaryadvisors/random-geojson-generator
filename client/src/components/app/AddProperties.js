import React from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'
import infoImage from '../../assets/info.svg'

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
                                <div class="tooltip">
                                    <img src={infoImage} alt="Property Name Info Icon" />
                                    <span class="tooltiptext">Name of the new attribute</span>
                                </div>
                                <Field class="fieldMedium" name={`propertyOptions.${index}.name`} type="text" />

                                <label htmlFor={`propertyOptions.${index}.type`}>Property Type: </label>
                                <div class="tooltip">
                                    <img src={infoImage} alt="Property Type Info Icon" />
                                    <span class="tooltiptext">The data type that defines the new attribute</span>
                                </div>
                                <Field class="fieldMedium" name={`propertyOptions.${index}.type`} as="select">
                                    {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                                </Field>
                                
                                <label htmlFor={`propertyOptions.${index}.values`}>List of Values:</label>
                                <div class="tooltip">
                                    <img src={infoImage} alt="List of Values Info Icon" />
                                    <span class="tooltiptext">Numeric or alphatetic values that define the new attribute (separated by commas)</span>
                                </div>
                                <Field name={`propertyOptions.${index}.values`} as='textarea' />
                                
                                <label htmlFor={`propertyOptions.${index}.min`}>Min (length, words, #, etc): </label>
                                <div class="tooltip">
                                    <img src={infoImage} alt="Min Info Icon" />
                                    <span class="tooltiptext">Example: min length of a line</span>
                                </div>
                                <Field class="fieldMedium" name={`propertyOptions.${index}.min`} type="number" />
                                
                                <label htmlFor={`propertyOptions.${index}.max`}>Max (length, words, #, etc): </label>
                                <div class="tooltip">
                                    <img src={infoImage} alt="Max Info Icon" />
                                    <span class="tooltiptext">Example: max number of points</span>
                                </div>
                                <Field class="fieldMedium" name={`propertyOptions.${index}.max`} type="number" />
                                
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