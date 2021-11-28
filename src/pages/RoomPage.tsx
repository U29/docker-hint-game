import { Typography, Box, Chip, Tooltip, ClickAwayListener, Button, Grid, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo, useLayoutEffect } from "react";
import PlayerChip from "../components/PlayerChip";
import InviteButton from "../components/InviteButton";
import { useTheme } from '@mui/material/styles';
import json2mq from 'json2mq'
import { Socket } from 'socket.io-client'
import Room from "../../server/Room";

type RoomPageType = {
    socket: Socket,
    room: {
        roomId: string
    }
}

type PlayerType = {
    playerId: string;
    playerName: string;
    isHost: boolean;
}

const RoomPage = ( {socket, room}:RoomPageType ) => {
    const [players, setPlayers] = useState({});
    const paramRoomId = useParams().roomId;
    const [roomId, setRoomId] = useState('');
    useEffect(() => {
        if(paramRoomId !== '' && typeof(paramRoomId) !== 'undefined'){
            setRoomId(paramRoomId);
        }else{
            setRoomId('');
        }
    }, []);
    useEffect(() => {
        console.log(socket.id);
        socket.emit('reqRoomData', roomId);
    }, [roomId]);
    useEffect(() => {
        socket.on('resRoomData', resRoom => {
            console.log(resRoom);
        });
    }, [room]);
    
    // Player list CSS customization
    const theme = useTheme();
    const isMdSize = useMediaQuery(
        json2mq({
        minWidth: 557,
      }),);
    const [smSize, setSmSize] = useState(useMemo(() => isMdSize, [isMdSize]));
    useEffect(() => {
        setSmSize(isMdSize);
    }, [isMdSize, useMediaQuery(theme.breakpoints.up('sm'))]);
    // End of player list CSS customization

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
                <Typography variant="h6">Room{roomId}</Typography>
                <Typography variant="h5">ユーザーリスト</Typography>
            </Box>
            <Box p={3} sx={{flexGrow: 1, width: '90%', margin:'0 auto'}}>
                <Grid container justifyContent={smSize ? 'space-between' : 'center'} >
                    { 
                        // players.players.map((player) => <PlayerChip player={player} key={player.clientId} />)
                    }
                </Grid>
            </Box>
            <Box sx={{textAlign: 'center'}}>
                <InviteButton roomId={roomId} />
            </Box>
        </Box>
    );    
}

export default RoomPage;
