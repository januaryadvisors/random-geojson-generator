import React from 'react';
import styled from 'styled-components'
import { FieldArray, useFormikContext } from 'formik';
import trashIcon from '../../assets/trash.svg'
import { LinkLikeButton } from '../general/Common';
import { MultiFieldLine, TextField, ParagraphTextField, SelectField, OptionsList } from '../general/FormFields';
import { propertyTypeOptions } from '../../constants/formOptions'

const Icon = styled.svg.attrs({ 
  version: '1.1', 
  xmlns: 'http://www.w3.org/2000/svg', 
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})``

const Svg = styled(Icon)` 
  width: 24px; 
  color: green;
`

const TrashIcon = () => {
  return (
    <Svg viewBox="0 0 108 109">   
      <path d="M83.9302419,20 C85.5870961,20 86.9302419,21.3431458 86.9302419,23 C86.9302419,23.0229847 86.9299777,23.0459687 86.9294495,23.0689473 L85.0673805,104.068947 C85.0299194,105.698507 83.6981628,107 82.0681729,107 L24.9318271,107 C23.3018372,107 21.9700806,105.698507 21.9326195,104.068947 L20.0705505,23.0689473 C20.032472,21.4125307 21.3443942,20.0388709 23.0008108,20.0007924 L83.9302419,20 Z M33.5,29 C32.1745166,29 31.0899613,30.0315359 31.0053177,31.3356243 L31,31.5 L31,96.5 C31,97.8807119 32.1192881,99 33.5,99 C34.8254834,99 35.9100387,97.9684641 35.9946823,96.6643757 L36,96.5 L36,31.5 C36,30.1192881 34.8807119,29 33.5,29 Z M74,29.2117647 C72.6745166,29.2117647 71.5899613,30.2433006 71.5053177,31.547389 L71.5,31.7117647 L71.5,96.3117647 C71.5,97.6924766 72.6192881,98.8117647 74,98.8117647 C75.3254834,98.8117647 76.4100387,97.7802288 76.4946823,96.4761404 L76.5,96.3117647 L76.5,31.7117647 C76.5,30.3310528 75.3807119,29.2117647 74,29.2117647 Z M54,29.2117647 C52.6745166,29.2117647 51.5899613,30.2433006 51.5053177,31.547389 L51.5,31.7117647 L51.5,96.3117647 C51.5,97.6924766 52.6192881,98.8117647 54,98.8117647 C55.3254834,98.8117647 56.4100387,97.7802288 56.4946823,96.4761404 L56.5,96.3117647 L56.5,31.7117647 C56.5,30.3310528 55.3807119,29.2117647 54,29.2117647 Z M59.5,1 C61.1568542,1 62.5,2.34314575 62.5,4 L62.5,6 L86.5,6 C88.1568542,6 89.5,7.34314575 89.5,9 L89.5,15 C89.5,16.1045695 88.6045695,17 87.5,17 L19.5,17 C18.3954305,17 17.5,16.1045695 17.5,15 L17.5,9 C17.5,7.34314575 18.8431458,6 20.5,6 L44.5,6 L44.5,4 C44.5,2.34314575 45.8431458,1 47.5,1 L59.5,1 Z" 
            id="Combined-Shape"></path>
    </Svg>
  )
}

const RemoveWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
`


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
                                <TextField name={`propertyOptions.${index}.name`} label="Property name" />
                                <SelectField name={`propertyOptions.${index}.type`} label="Property type">
                                    <OptionsList options={propertyTypeOptions} name={`propertyOptions.${index}.type`} />
                                </SelectField>
                                <ParagraphTextField name={`propertyOptions.${index}.values`} label="List of values" />
                                <TextField name={`propertyOptions.${index}.min`} type={"number"} label="Min (length, words, #, etc)" />
                                <TextField name={`propertyOptions.${index}.max`} type={"number"} label="Max (length, words, #, etc)" />
                                <RemoveWrapper>
                                    <RemoveButton type="button" onClick={removeOption}>
                                    <TrashIcon src={trashIcon} alt="Trash can icon" />
                                    </RemoveButton>
                                </RemoveWrapper>
                            </>
                        );
                        })
                    }
                    <LinkLikeButton type="button" onClick={() => arrayHelpers.push({name: "", type: "", values: "", min: "", max: ""})}>
                        Add property +
                    </LinkLikeButton>
                </div>
            )}
        />

    )
}