import { TextField, Box } from "@mui/material";
import e from "cors";
import { useState, useEffect, useLayoutEffect } from "react";
import { Socket } from 'socket.io-client'

type EntryPlayerNameType = {
    playerName: string,
    setPlayerName: React.Dispatch<React.SetStateAction<string>>
    errorValue: boolean,
    setErrorValue: React.Dispatch<React.SetStateAction<boolean>>,
    socket: Socket,
    initializedSocket: boolean
}

const NameField = ({playerName, setPlayerName, errorValue, setErrorValue, socket, initializedSocket}:EntryPlayerNameType) => {
    useEffect(() => {
        if(typeof(socket.id) !== 'undefined') {
            // TODO: remove test program ↓
            setPlayerName(socket.id.slice(0,8));
        }
    }, [initializedSocket]);
    return (
        <Box sx={{pb:3}}>
            <TextField error={errorValue} required id="input-player-name" label="プレイヤー名" variant="outlined" value={playerName} onChange={e => setPlayerName(e.target.value)} autoComplete="off" />
        </Box>
    );
}

export default NameField;