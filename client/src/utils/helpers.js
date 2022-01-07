import { toast } from "react-toastify";

// Status code helpers
export const statusIsGood = (status) => status >= 200 && status < 300;
export const statusIsUnauthorized = (status) => status === 401;

// Date helpers
// get date in YYYY-MM-DD format
export const getYearMonthDayDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const monthsWithThirtyDays = ['4', '6', '9', '11'];

// Given month & year, return array of day options
export const getDayOptions = (month, year) => {
  let days = 31;
  if (monthsWithThirtyDays.includes(month)) {
    days = 30;
  } else if (month === '2') {
    const isLeapYear = year ? year % 4 === 0 : true;
    days = isLeapYear ? 29 : 28;
  }
  const options = Array.from({length: days}, (item, index) => {
    const day = (index + 1).toString();
    return { value: day, label: day };
  });
  return [{ value: '', label: 'Select day' }, ...options];
}

// Given an optional range, return array of year options starting from the given year (or current year if undefined)
export const getYearOptions = (range, endYear, offset) => {
  const currYear = endYear || new Date().getFullYear();
  const options = Array.from({length: (range || 90)}, (item, index) => {
    const year = currYear - index - (offset != null ? offset : 17);
    return { value: year, label: year };
  });
  return [{ value: '', label: 'Select year' }, ...options];
}

export const formatToTwoDigits = num => ("0" + num).slice(-2);

// return given 'date' in MM/DD/YYYY format, or current date if 'date' param is not supplied.
export const getMDYDate = (date) => {
  if (date) {
    const dateObj = new Date(date);
    return `${formatToTwoDigits(dateObj.getUTCMonth() + 1)}/${formatToTwoDigits(dateObj.getUTCDate())}/${dateObj.getUTCFullYear()}`
  }
  return '';
}


// For IE
export const getMonthFromIndex = (index) => {
  switch(index) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November'; 
    case 11:
      return 'December';  
  }
}

// Date is valid if the given day is less than the number of days for that month + year from getDayOptions (+1 for 'Select day' option)
export const isValidDate = (month, day, year) => parseInt(day) < getDayOptions(month, year).length;

export const isValidHexcode = value => /^#[0-9A-F]{6}$/i.test(value);

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [255, 255, 255];
}

// https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
const luminance = (r, g, b) => {
  var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export const contrast = (hex1, hex2) => {
  var lum1 = luminance(...hexToRgb(hex1));
  var lum2 = luminance(...hexToRgb(hex2));
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05)
       / (darkest + 0.05);
}

// Wrapper for the a formik submit, that will display a toast message with the number of errors if present
export const submitWithErrorMsg = (errors, handleSubmit) => {
  return () => {
    if (errors && Object.keys(errors).length > 0) {
      const numErrors = Object.keys(errors).length;
      toast.error(`There ${numErrors > 1 ? 'are' : 'is'} ${numErrors} field${numErrors > 1 ? 's' : ''} that need to be fixed`)
    }
    handleSubmit();
  }
}