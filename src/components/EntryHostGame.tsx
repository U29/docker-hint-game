import { Button, Box } from "@mui/material";
import NameField from "./NameField";
import { useEffect, useState } from "react";
import { Socket } from 'socket.io-client'

type EntryHostGameType = {
    playerName: string,
    setPlayerName: React.Dispatch<React.SetStateAction<string>>,
    socket: Socket,
    initializedSocket: boolean
}

const EntryHostGame = ( {playerName, setPlayerName, socket, initializedSocket}:EntryHostGameType ) => {
    const [errorValue, setErrorValue] = useState(false);
    const handleClickButton = () => {
        playerName === '' ? setErrorValue(true) : setErrorValue(false);
        if (playerName !== ''){
            socket.emit('createRoom', playerName);
        }
    }
    return (
        <Box sx={{textAlign: 'center'}} component="form" autoComplete="off">
            <NameField playerName={playerName} setPlayerName={setPlayerName} errorValue={errorValue} setErrorValue={setErrorValue} socket={socket} initializedSocket={initializedSocket} />
            <Button variant="contained" onClick={handleClickButton} disabled={!initializedSocket} >ゲームをホスト</Button>
        </Box>
    );
}

export default EntryHostGame;