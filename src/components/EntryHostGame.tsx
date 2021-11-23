import { Button, Box } from "@mui/material";
import NameField from "./NameField";
import { useState } from "react";

type EntryHostGameType = {
    playerName: string,
    setPlayerName: React.Dispatch<React.SetStateAction<string>>,
}

const EntryHostGame = ( {playerName, setPlayerName}:EntryHostGameType ) => {
    const [errorValue, setErrorValue] = useState(false);
    const handleClickButton = () => {
        playerName === '' ? setErrorValue(true) : setErrorValue(false);
    }
    return (
        <Box sx={{textAlign: 'center'}} component="form" autoComplete="off">
            <NameField playerName={playerName} setPlayerName={setPlayerName} errorValue={errorValue} setErrorValue={setErrorValue} />
            <Button variant="contained" onClick={handleClickButton}>ゲームをホスト</Button>
        </Box>
    );
}

export default EntryHostGame;