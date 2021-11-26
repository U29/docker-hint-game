import { Button, Box, Tab } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import EntryHostGame from "../components/EntryHostGame";
import EntryJoinGame from "../components/EntryJoinGame";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams } from "react-router";
import { Socket } from 'socket.io-client'

type TopPageType = {
    socket: Socket,
    initializedSocket: boolean
}

const TopPage = ({socket, initializedSocket}:TopPageType) => {
    const [tabValue, setTabValue] = useState('1');
    const handleTabChange = (event: SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };
    const [playerName, setPlayerName] = useState('');
    const paramRoomId = useParams().roomId;
    const [roomId, setRoomId] = useState('');
    useEffect(()=>{
        if(paramRoomId !== '' && typeof(paramRoomId) !== 'undefined'){
            setRoomId(paramRoomId);
        }else{
            setRoomId('');
        }
    }, []);
    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList value={tabValue} onChange={handleTabChange} aria-label="top page tabs" centered >
                        <Tab label="ゲームに参加" value='1' />
                        <Tab label="ゲームをホスト" value='2' />
                    </TabList>
                </Box>
                <TabPanel value='1'>
                    <EntryJoinGame playerName={playerName} setPlayerName={setPlayerName} roomId={roomId} socket={socket} initializedSocket={initializedSocket} />
                </TabPanel>
                <TabPanel value='2'>
                    <EntryHostGame playerName={playerName} setPlayerName={setPlayerName} socket={socket} initializedSocket={initializedSocket} />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default TopPage;