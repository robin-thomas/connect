import MUIFormControl from '@mui/material/FormControl';
import MUIFormHelperText from '@mui/material/FormHelperText';
import MUIInput from '@mui/material/Input';
import MUIInputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

const Input = ({ formik, name, label, disabled, ...props}) => (
  <MUIFormControl variant="standard" fullWidth error={formik.touched[name] && Boolean(formik.errors[name])}>
    <MUIInputLabel shrink>{label}</MUIInputLabel>
    <MUIInput
      {...props}
      name={name}
      value={formik.values[name]}
      onChange={(e) => {
        formik.setFieldTouched(name);
        formik.handleChange(e);
      }}
      onBlur={formik.handleSubmit}
      disabled={disabled}
      disableUnderline={disabled}
      autoComplete='off'
    />
    <MUIFormHelperText>{formik.touched[name] && formik.errors[name]}</MUIFormHelperText>
  </MUIFormControl>
)

Input.propTypes = {
  formik: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
