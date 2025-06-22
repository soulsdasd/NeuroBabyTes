import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';

function RadioForm({ label, value, setValue, name }){
    return(
        <>
            <FormLabel sx={{ color: 'black', '&.Mui-focused': { color: 'black' }}}>{label}</FormLabel>
            <RadioGroup
                name={name}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
        </>
    );
}

export default RadioForm;