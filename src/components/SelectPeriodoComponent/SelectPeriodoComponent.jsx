import { FormControl, InputLabel, Select, MenuItem, FormLabel } from '@mui/material';

function SelectPeriodoComponent({opcion, setOpcion, apartado}) {
    const handleChange = (event) => {
        setOpcion(event.target.value);
    };

    return (   
        <>
            {apartado==='tono' && (
            <FormControl fullWidth>
            <InputLabel id="combo-label">Periodo</InputLabel>
            <Select
                labelId="combo-label"
                value={opcion}
                label="Periodo"
                onChange={handleChange}
            >
                <MenuItem value="nacimiento">Nacimiento</MenuItem>
                <MenuItem value="primer_visita">Primer visita</MenuItem>
                <MenuItem value="segundo_mes">2do mes</MenuItem>
                <MenuItem value="tercer_mes">3er mes</MenuItem>
                <MenuItem value="cuarto_mes">4to mes</MenuItem>
            </Select>
            </FormControl>
            )}

            {apartado==='arcaicos' && (
                <FormControl fullWidth>
                <InputLabel id="combo-label">Periodo</InputLabel>
                <Select
                    labelId="combo-label"
                    value={opcion}
                    label="Periodo"
                    onChange={handleChange}
                >
                    <MenuItem value="primer_visita">Primer visita</MenuItem>
                    <MenuItem value="segunda_visita">Segunda visita</MenuItem>
                    <MenuItem value="examen">Examen</MenuItem>
                </Select>
                </FormControl>
            )}

            {(apartado==='primero' || apartado==='segundo') && (
                <FormControl fullWidth>
                <InputLabel id="combo-label">Periodo</InputLabel>
                <Select
                    labelId="combo-label"
                    value={opcion}
                    label="Periodo"
                    onChange={handleChange}
                >
                    <MenuItem value="primer_visita">Primer visita</MenuItem>
                    <MenuItem value="segunda_visita">Segunda visita</MenuItem>
                </Select>
                </FormControl>
            )}
        </>     
    );
}

export default SelectPeriodoComponent;