import React from "react";
import { TextField as MTextField } from "@material-ui/core";

import { Controller } from "react-hook-form";
import _ from "lodash";

const ControlledTextField = ({
  formProps,
  customInput: CustomInput,
  format,
  name,
  ...otherProps
}) => {
  const { control, errors, rules, initialValues } = formProps;
  const isError = errors[name] !== undefined;
  
  return (
    <Controller
      name={name}
      control={control}
      rules={rules[name]}
      defaultValue={format ? format(initialValues[name]) : initialValues[name]}
      render={({ onChange, onBlur, value }) => (
        <MTextField
          {...otherProps}
          required={_.get(rules[name], 'required')}
          value={value}
          error={isError}
          helperText={errors[name]?.message}
          onChange={(v) => {
            onChange(format ? format(v) : v);
            !!otherProps.onChange && otherProps.onChange(format ? format(format) : v);
          }}
          onBlur={() => {
            onBlur();
            !!otherProps.onBlur && otherProps.onBlur(value);
          }}
          InputProps={{
            inputComponent: CustomInput
          }}
        />
      )}
    />
  );
};

export default ControlledTextField;
