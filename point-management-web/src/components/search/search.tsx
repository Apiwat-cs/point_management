import React, { ReactNode } from 'react';

// material-ui
import { Autocomplete, TextField, Typography, Box } from '@mui/material';

interface SearchSelectProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => ReactNode;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
}

function SearchSelect<T>({
  options,
  value,
  onChange,
  getOptionLabel,
  renderOption,
  isOptionEqualToValue,
  placeholder = 'เลือกข้อมูล...',
  error,
  helperText,
  disabled,
  id = 'generic-search-select',
  loading
}: SearchSelectProps<T>) {
  return (
    <Autocomplete
      id={id}
      options={options}
      loading={loading}
      autoHighlight
      disabled={disabled}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={(_event, newValue) => {
        onChange(newValue);
      }}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={renderOption || ((props, option) => (
        <Box component="li" {...props}>
          <Typography variant="body1">
            {getOptionLabel(option)}
          </Typography>
        </Box>
      ))}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
              bgcolor: disabled ? '#F8FAFC' : '#fff',
              '& fieldset': { borderColor: '#94A3B8' },
              '&:hover fieldset': { borderColor: '#64748B' },
              '&.Mui-focused fieldset': { borderColor: '#1A69FF' },
              '&.Mui-disabled': {
                bgcolor: '#F8FAFC',
                '& fieldset': { borderColor: '#94A3B8' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#94A3B8' },
                WebkitTextFillColor: '#64748B'
              }
            },
            '& .MuiInputBase-input.Mui-disabled': {
              color: '#64748B',
              WebkitTextFillColor: '#64748B'
            }
          }}
        />
      )}
      noOptionsText="ไม่พบข้อมูล"
    />
  );
}

export const Search = SearchSelect;
export default SearchSelect;
