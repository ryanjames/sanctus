import { StylesConfig } from 'react-select'
  
const selectFieldStyles: StylesConfig = {
  control: (styles, { isFocused, menuIsOpen }) => {
    return {
      ...styles,
      backgroundColor: '#131628',
      boxShadow: 'none',
      border: isFocused || menuIsOpen
      ? '1px solid rgba(255,255,255,0.6)'
      : '1px solid rgba(255,255,255,0.3)',
      ':hover': {
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: 'none'
      },
      ':active': {
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: 'none'
      },
    }
  },
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused
      ? '#120D1D'
      : '#131628',
      padding: '4px',
      color: '#fff',
      fontWeight: isSelected
      ? 'bold'
      : 'normal',
      ':hover': {
        cursor: 'pointer',
      },
    };
  },
  input: (styles) => ({ 
    ...styles,
    color: '#fff',
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#131628',
    };
  },
  singleValue: (styles) => ({
    ...styles,
    color: '#fff',
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#fff',
    backgroundColor: '#17203C',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'rgba(255,255,255,0.5)',
    backgroundColor: '#17203C',
    ':hover': {
      color: 'white',
      cursor: 'pointer',
    },
  }),
}

export default selectFieldStyles