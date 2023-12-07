import React from "react";
import NumberFormat from "react-number-format";
import { parse, isValid, format } from 'date-fns';
import { removeNonDigitsFromString } from "../../utils/basic";

export const formatDate = (value) => {
  if (value instanceof Date) {
    return format(value, 'dd/MM/yyyy');
  }

  const parsedDate = parse(value, 'yyyy-MM-dd', new Date());

  if (isValid(parsedDate)) {
    return format(parsedDate, 'dd/MM/yyyy');
  }

  const stripped = removeNonDigitsFromString(value);

  if (stripped.length > 10) {
    return `${stripped.slice(0, 2)}/${stripped.slice(2, 4)}/${stripped.slice(4, 8)}`;
  } else {
    let finalValue = stripped.slice(0, 2);

    if (stripped.length > 2) {
      finalValue += `/${stripped.slice(2, 4)}`;
    }

    if (stripped.length > 4) {
      finalValue += `/${stripped.slice(4, 8)}`;
    }

    return finalValue;
  }
};

const DateTextField = ({ inputRef, onChange, ...other }) => {

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange(values.formattedValue);
      }}
      format={formatDate}
    />
  );
};

export default DateTextField;
