import React from 'react'
import { TextField } from '@material-ui/core'

interface Props {
  className?: string,
  name: string,
  label?: string,
  touched?: any,
  errors?: any,
  value?: any,
  type?: string,
  select?: boolean,
  shrink?: boolean,
  disabled?: boolean,
  multiline?: boolean,
  rows?: number,
  onBlur?(e: React.FocusEvent<any>): any,
  onFocus?(e: React.FocusEvent<any>): any,
  onChange?(e: React.ChangeEvent<any>): any
}

const InputText: React.FC<Props> = ({ className, name, label = '', multiline = false, rows = 2, shrink, touched = {}, type = 'text', errors = {}, value, select = false, onFocus, onBlur, onChange, children, disabled = false, ...rest }) => {

  return (
    <TextField
      className={className}
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      label={label}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      value={value}
      select={select}
      InputLabelProps={{ shrink: shrink }}
      fullWidth
      multiline={multiline}
      rows={rows}
      margin="normal"
      variant="outlined"
      disabled={disabled}
      onFocus={onFocus}
    >
      {select && children}
    </TextField>
  )
}

export default InputText
