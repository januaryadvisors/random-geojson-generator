import React from 'react';
import { Field, FieldArray, useFormikContext } from 'formik';
import { propertyTypeOptions } from '../../constants/formOptions'
import infoImage from '../../assets/info.svg'

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
                                <strong id="param" htmlFor={`propertyOptions.${index}.name`}>Property Name: </strong>
                                <div class="tooltip">
                                    <img src={infoImage} alt="info" />
                                    <span class="tooltiptext">Name of the new attribute</span>
                                </div>
                                <Field id="fieldMedium" name={`propertyOptions.${index}.name`} type="text" />

                                <strong id="param" htmlFor={`propertyOptions.${index}.type`}>Property Type: </strong>
                                <div class="tooltip">
                                    <img src={infoImage} alt="info" />
                                    <span class="tooltiptext">The data type that defines the new attribute</span>
                                </div>
                                <Field id="fieldMedium" name={`propertyOptions.${index}.type`} as="select">
                                    {propertyTypeOptions.map(propertyTypeOption => (<option value={propertyTypeOption.value}>{propertyTypeOption.label}</option>))}
                                </Field>

                                <strong id="param" htmlFor={`propertyOptions.${index}.values`}>List of Values:</strong>
                                <div class="tooltip">
                                    <img src={infoImage} alt="info" />
                                    <span class="tooltiptext">Numeric or alphatetic values that define the new attribute (separated by commas)</span>
                                </div>
                                <Field id="fieldLarge" name={`propertyOptions.${index}.values`} />
                                
                                <strong id="param" htmlFor={`propertyOptions.${index}.min`}>Min (length, words, #, etc): </strong>
                                <div class="tooltip">
                                    <img src={infoImage} alt="info" />
                                    <span class="tooltiptext">Example: min length of a line</span>
                                </div>
                                <Field id="fieldMedium" name={`propertyOptions.${index}.min`} type="number" />
                                
                                <strong id="param" htmlFor={`propertyOptions.${index}.max`}>Max (length, words, #, etc): </strong>
                                <div class="tooltip">
                                    <img src={infoImage} alt="info" />
                                    <span class="tooltiptext">Example: max number of points</span>
                                </div>
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