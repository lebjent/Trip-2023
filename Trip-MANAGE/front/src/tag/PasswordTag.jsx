import { TextField } from '@mui/material'

function PasswordTag(props) {
    
    const {label,value,error,helperText,success,onChange} = props;

    return (
    <TextField
        error={error}
        color={success}
        required
        fullWidth
        label={label}
        type="password"
        autoComplete="new-password"
        value={value}
        helperText={helperText}
        onChange={onChange}
        size="small"
    />
  )
}

export default PasswordTag