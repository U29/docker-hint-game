import { Button, Box, TextField, Alert } from "@mui/material";
import NameField from "./NameField";
import { useEffect, useState } from "react";
import { Socket } from 'socket.io-client'

type EntryJoinGameType = {
    playerName: string,
    setPlayerName: React.Dispatch<React.SetStateAction<string>>,
    roomId: string,
    socket: Socket,
    initializedSocket: boolean
}

const EntryJoinGame = ( {playerName, setPlayerName, roomId, socket, initializedSocket}:EntryJoinGameType ) => {
    const [inputRoomId, setInputRoomId] = useState(roomId);
    const [errorPlayerValue, setErrorPlayerValue] = useState(false);
    const [errorRoomIdValue, setErrorRoomIdValue] = useState(false);
    const handleClickButton = () => {
        playerName === '' ? setErrorPlayerValue(true) : setErrorPlayerValue(false);
        // typeof(roomId) === 'undefined' && roomId = '';
        inputRoomId === '' || inputRoomId.length < 4 ? setErrorRoomIdValue(true) : setErrorRoomIdValue(false);

        if (playerName !== '' && (inputRoomId !== '' || inputRoomId.length > 4)){
            console.log('clicked');
            socket.emit('joinRoom', {
                playerName: playerName,
                roomId: inputRoomId
            });
        }
    }
    useEffect(()=>{
        setInputRoomId(roomId);
    },[roomId]);
    return (
        <Box component="form" autoComplete="off" sx={{textAlign: 'center'}}>
            <NameField playerName={playerName} setPlayerName={setPlayerName} errorValue={errorPlayerValue} setErrorValue={setErrorPlayerValue} socket={socket} initializedSocket={initializedSocket} />
            <Box sx={{pb:3}}>
                <TextField error={errorRoomIdValue} required inputProps={{maxLength: 4}} id="input-room-id" label="ルームID" variant="outlined" onChange={e => setInputRoomId(e.target.value)} value={inputRoomId} />
            </Box>
            {   
                roomId === '' ? <></> :
                    <Box sx={{pb:3, margin: 'auto',  width: '100%'}}>
                        <Alert severity="success" sx={{justifyContent: 'center'}}>招待ルームIDを自動入力しました</Alert>
                    </Box>
            }
            <Button variant="contained" onClick={handleClickButton} disabled={!initializedSocket} >ゲームに参加</Button>
        </Box>
    );
}

export default EntryJoinGame;