import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect } from "react";

type ColorSchemeSwitchType = {
    prefersDarkMode: boolean,
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ColorSchemeSwitch = ( { prefersDarkMode, darkMode, setDarkMode }: ColorSchemeSwitchType ) => {
    useEffect(() => {
        prefersDarkMode ? setDarkMode(true) : setDarkMode(false)
    }, [prefersDarkMode]);
    return (
        <FormGroup sx={{alignItems: 'flex-end'}}>
            <FormControlLabel 
                control={<Switch />} 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)} 
                labelPlacement='start'
                label={darkMode ? <DarkModeIcon sx={{fontSize: 'large', verticalAlign: 'middle'}} /> 
                                : <LightModeIcon sx={{fontSize: 'large', verticalAlign: 'middle'}} />} 
            />
        </FormGroup>
    );
}

export default ColorSchemeSwitch;