import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import propTypes from 'prop-types';

import { IconButton } from '@/layouts/core/Button';
import { TextField } from '@/layouts/core/TextField';

const Search = ({ name, placeholder, formik, onChange, disabled, display }) => (
  <TextField
    formik={formik}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    onBlur={formik.handleSubmit}
    disabled={disabled}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon fontSize="small" />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          {disabled ? (
            <CircularProgress color="secondary" size={16} />
          ) : formik.touched[name] && !formik.errors[name] && display && (
            <IconButton title="Save" onClick={formik.handleSubmit}>
              <CheckIcon fontSize="small" />
            </IconButton>
          )}
        </InputAdornment>
      ),
    }}
  />
)

Search.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  formik: propTypes.object.isRequired,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  display: propTypes.bool,
};

export default Search;
