import { TextField, Box } from "@mui/material";
import { useState } from "react";

type EntryPlayerNameType = {
    playerName: string,
    setPlayerName: React.Dispatch<React.SetStateAction<string>>
    errorValue: boolean,
    setErrorValue: React.Dispatch<React.SetStateAction<boolean>>
}

const NameField = ({playerName, setPlayerName, errorValue, setErrorValue}:EntryPlayerNameType) => {
    
    return (
        <Box sx={{pb:3}}>
            <TextField error={errorValue} required id="input-player-name" label="プレイヤー名" variant="outlined" value={playerName} onChange={e => setPlayerName(e.target.value)} autoComplete="off" />
        </Box>
    );
}

export default NameField;