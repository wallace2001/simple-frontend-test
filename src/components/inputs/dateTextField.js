import React from "react";
import NumberFormat from "react-number-format";
import { removeNonDigitsFromString } from "../../utils/basic";

export const formatDate = (value) => {

  if (value instanceof Date) {
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0'); // Meses são indexados de 0 a 11
    const year = value.getFullYear();

    const dataFormatada = `${day}${month}${year}`;

    return dataFormatada;
  }

  const stripped = removeNonDigitsFromString(value);

  if (stripped.length > 10) {
    let finalValue = stripped.slice(0, 2) + '/' + stripped.slice(2, 4) + '/' + stripped.slice(4, 8);

    return finalValue;
  } else {
    let finalValue = stripped.slice(0, 2);

    if (stripped.length > 2) {
      finalValue += '/' + stripped.slice(2, 4);
    }

    if (stripped.length > 4) {
      finalValue += '/' + stripped.slice(4, 8);
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
