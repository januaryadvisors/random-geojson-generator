import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Field, useField, useFormikContext } from "formik";
import closeIcon from '../../assets/close.svg'
import { ERROR, MAX_DESKTOP_WIDTH } from '../../cssVars';
import { monthOptions, yesNoOptions } from '../../constants/formOptions'
import { StatefulButton } from '../general/Common'
import { getDayOptions, getYearMonthDayDate, getYearOptions, isValidDate } from '../../utils/helpers';

const SHORT_WIDTH = 300;

const ErrorText = styled.label`
  margin-bottom: 2px;
  font-size: 16px;
  display: block;
  color: ${ERROR};
`

const LabelledInput = styled.div`
  & > label {
    margin-bottom: 2px;
    font-size: 16px;
    display: block;
    ${({ error }) => error ? `color: ${ERROR};` : ''}
  }
  & > div > input {
    width: ${({ short }) => short ? `${SHORT_WIDTH}px` : '100%'};
  }
  & > div > select {
    width: ${({ short }) => short ? `${SHORT_WIDTH}px` : '100%'};
  }
  margin: 15px 0px;
  @media only screen and (max-width: ${MAX_DESKTOP_WIDTH}px) {
    & > div > input {
      width: 100%;
    }
    & > div > select {
      width: 100%;
    }
  } 
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0px;
  margin-bottom: 2px;
`

const DeleteIcon = styled.img`
  width: 20px;
  height: 20px;
  margin: 10px;
  cursor: pointer;
`

export const DeleteButton = ({ onDelete }) => 
  <DeleteIcon onClick={onDelete} src={closeIcon} />

// Wrapper for field inputs, displaying labels and helper text
export const FieldWrapper = ({ label, helperText, field, children, style, short, error, onDelete, hideLabel, id }) => {
  const { helperText: fieldHelperText, required } = (field || {});
  const secondaryText = fieldHelperText || helperText;
  return (
    <LabelledInput style={style} short={short} error={error}>
      {!hideLabel && <label htmlFor={id}>{label}{field && required ? '*' : ''}</label>}
      {secondaryText && <label style={{ fontStyle: 'italic' }}>{secondaryText}</label>}
      <InputWrapper>
        {children}
        {onDelete && <DeleteButton onDelete={onDelete} />}
      </InputWrapper>
      {error && <label>{error}</label>}
    </LabelledInput>
  )
}

export const TextField = ({ name, placeholder, type, ...props }) => (
  <FieldWrapper {...props} id={name}>
    <Field id={name} name={name} type={type || 'text'} placeholder={placeholder} />
  </FieldWrapper>
)

export const ParagraphTextField = ({ name, placeholder, ...props }) => (
  <FieldWrapper {...props} id={name}>
    <Field id={name} as="textarea" rows={15} name={name} placeholder={placeholder} />
  </FieldWrapper>
)

export const SelectField = ({ name, children, placeholder, ...props }) => (
  <FieldWrapper {...props}>
    <Field as="select" name={name}>
      {children}
    </Field>
  </FieldWrapper>
)

const RadioButtonWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 10px 0px;
  margin-right: 15px;
  font-size: 14px;
`;

export const RadioButtonField = ({ name, options, ...props }) => (
  <FieldWrapper {...props}>
    {options.map(option => (
      <RadioButtonWrapper key={option.value}>
        <Field id={name} style={{ width: 'auto' }} type="radio" value={option.value} name={name} />
        <div style={{ marginLeft: '2px' }}>{option.label}</div>
      </RadioButtonWrapper>
    ))}
  </FieldWrapper>
)

const CheckboxWrapper = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  ${({ wrapperStyle }) => wrapperStyle};
`

const Checkbox = ({ name, value, label, children, wrapperStyle }) => (
  <CheckboxWrapper wrapperStyle={wrapperStyle}>
    <Field id={name} className="regular-checkbox" type="checkbox" name={name} value={value} />
    {children}{label}
  </CheckboxWrapper>
)

export const CheckboxField = ({ error, ...props }) => (
  <div>
    <Checkbox {...props} />
    {error && <ErrorText>{error}</ErrorText>}
  </div>
)

export const CheckboxGroup = ({ checkboxOptions, name, error, labelId, label, style, checkboxStyle }) => (
  <div role="group" aria-labelledby={labelId} style={style}>
    {label && <label style={{ fontSize: '16px'}}>{label}</label>}
    {checkboxOptions.map((props) => <Checkbox {...props} name={name} wrapperStyle={checkboxStyle} key={props.value}  />)}
    {error && <ErrorText>{error}</ErrorText>}
  </div>
)

export const MultiFieldLine = styled.div`
  width: ${({ width }) => width || '100%'};
  display: grid;
  grid-column-gap: 15px;
  grid-template-columns: ${({ columns }) => columns};
  @media only screen and (max-width: ${MAX_DESKTOP_WIDTH}px) {
    display: flex;
    flex-direction: column;
    > div {
      max-width: 400px;
    }
  }  
`;

export const CustomMDYField = (props) => {
  const { setFieldValue, setFieldTouched, setFieldError } = useFormikContext();
  const [field] = useField(props);
  const initialDate = field && field.value ? new Date(field.value) : null;

  const [month, setMonth] = useState(initialDate ? (initialDate.getMonth() + 1) : '');
  const [day, setDay] = useState(initialDate ? initialDate.getDate() : '');
  const [year, setYear] = useState(initialDate ? initialDate.getFullYear() : '');
  const dayOptions = getDayOptions(month, year);
  const yearOptions = getYearOptions();

  useEffect(() => {
    if (month !== '' && day !== '' && year !== '' && isValidDate(month, day, year)) {
      const date = `${month}/${day}/${year}`;
      setFieldError(props.name, undefined);
      setFieldTouched(props.name, true);
      setFieldValue(props.name, new Date(date));
    } else if (field.value != null) {
      setFieldValue(props.name, null);
    }
    // eslint-disable-next-line
  }, [month, day, year])

  return (
    <FieldWrapper {...props}>
      <MultiFieldLine columns={`20% 120px 120px`}>
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <OptionsList options={monthOptions} name="month" hideSelectOne={true} />
        </select>
        <select value={day} onChange={e => setDay(e.target.value)}>
          <OptionsList options={dayOptions} name="day" hideSelectOne={true} />
        </select>
        <select value={year} onChange={e => setYear(e.target.value)}>
          <OptionsList options={yearOptions} name="year" hideSelectOne={true} />
        </select>
      </MultiFieldLine>
    </FieldWrapper>
  );
};


export const MDYField = (props) => {
  const error = props.error;
  const { setFieldValue, setFieldTouched, setFieldError } = useFormikContext();
  const [field] = useField(props);
  const initialDate = field && field.value ? new Date(field.value) : null;

  const [month, setMonth] = useState(initialDate ? (initialDate.getUTCMonth() + 1) : '');
  const [day, setDay] = useState(initialDate ? initialDate.getUTCDate() : '');
  const [year, setYear] = useState(initialDate ? initialDate.getUTCFullYear() : '');
  const dayOptions = getDayOptions(month, year);
  const yearOptions = getYearOptions();

  useEffect(() => {
    if (month !== '' && day !== '' && year !== '' && isValidDate(month, day, year)) {
      const date = new Date(`${month}/${day}/${year}`);
      setFieldError(props.name, undefined);
      setFieldTouched(props.name, true);
      setFieldValue(props.name, getYearMonthDayDate(date));
    } else if (field.value != null) {
      setFieldValue(props.name, null);
    }
    // eslint-disable-next-line
  }, [month, day, year])

  return (
    <div>
      <MultiFieldLine columns={`auto auto auto`}>
        <FieldWrapper error={error && month === '' ? error : null} label="Month" field={{ required: true }}>
          <select value={month} onChange={e => setMonth(e.target.value)}>
            <OptionsList options={monthOptions} name="month" hideSelectOne={true} />
          </select>
        </FieldWrapper>
        <FieldWrapper label="Day" error={error && (day === '' || !isValidDate(month, day, year)) ? error : null} field={{ required: true }}>
          <select value={day} onChange={e => setDay(e.target.value)}>
            <OptionsList options={dayOptions} name="day" hideSelectOne={true} />
          </select>
        </FieldWrapper>
        <FieldWrapper label="Year" error={error && year === '' ? error : null} field={{ required: true }}>
          <select value={year} onChange={e => setYear(e.target.value)}>
            <OptionsList options={yearOptions} name="year" hideSelectOne={true} />
          </select>
        </FieldWrapper>
      </MultiFieldLine>
      {error && error !== "Required" && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export const YesNoField = (props) => {
  const { error, name } = props;
  const [clicked, setClicked] = useState(false);
  const { setFieldValue, setFieldTouched, submitCount } = useFormikContext();
  const [field] = useField(props);

  const handleClick = (setActive) => {
    // setFieldError(props.name, undefined);
    setFieldValue(name, setActive ? true : false);
    if (!clicked) {
      setClicked(true);
      setFieldTouched(name, true);
    }
  }
  
  return (
    <FieldWrapper error={error === 'Required' ? (!clicked || submitCount > 0) && error : field.value === false && error} 
                  field={{ required: true }} hideLabel={true} label={props.label}>
      <StatefulButton data-testid={`${name}_yes`} type="button" active={field.value === true} onClick={() => handleClick(true)}>Yes</StatefulButton>
      <StatefulButton data-testid={`${name}_no`} type="button" active={field.value === false} onClick={() => handleClick(false)}>No</StatefulButton>
    </FieldWrapper>
  );
};

// Dropdown select input with "Yes"/"No"/"Select one" labels and true/false/null values. 
// Select inputs return values as strings, but since we want to store booleans, 
// this augemnted select saves boolean/null values straight from the field.
export const YesNoSelectField = (props) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field] = useField(props);

  const handleChange = (e) => {
    if (!field.touched) {
      setFieldTouched(props.name, true);
    }
    // Convert the returned string values to true/false/null
    if (e.target.value === 'true') {
      setFieldValue(props.name, true);
    } else if (e.target.value === 'false') {
      setFieldValue(props.name, false);
    } else {
      setFieldValue(props.name, null);
    }
  }
  
  return (
    <FieldWrapper {...props}>
      <select value={field.value} onChange={handleChange}>
        <OptionsList options={yesNoOptions} name={props.name} />
      </select>
    </FieldWrapper>
  );
};

export const OptionsList = ({ hideSelectOne, options, name }) => {
  const fullOptions = [ ...(hideSelectOne ? [] : [{ value: "", label: "Select One" }]), ...options ];
  return fullOptions.map(option => (
    <option key={`${name}_${option.value}`} value={option.value}>
      {option.label}
    </option>)
  )
}