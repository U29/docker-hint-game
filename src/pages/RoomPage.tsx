import { Typography, Box, Chip, Tooltip, ClickAwayListener, Button, Grid, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import testUsers from "../test_json/Users.json";
import UserChip from "../components/UserChip";
import InviteButton from "../components/InviteButton";
import { useTheme } from '@mui/material/styles';
import json2mq from 'json2mq'

type RoomPageType = {
    roomId: string
}

const RoomPage = ( {roomId}:RoomPageType ) => {
    const Users = testUsers;
    const [users, setUsers] = useState(Users);   


    // User list CSS customization
    const theme = useTheme();
    const isMdSize = useMediaQuery(
        json2mq({
        minWidth: 557,
      }),);
    const [smSize, setSmSize] = useState(useMemo(() => isMdSize, [isMdSize]));
    useEffect(() => {
        setSmSize(isMdSize);
    }, [isMdSize, useMediaQuery(theme.breakpoints.up('sm'))]);
    // End of user list CSS customization

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
                <Typography variant="h6">Room{roomId}</Typography>
                <Typography variant="h5">ユーザーリスト</Typography>
            </Box>
            <Box p={3} sx={{flexGrow: 1, width: '90%', margin:'0 auto'}}>
                <Grid container justifyContent={smSize ? 'space-between' : 'center'} >
                    { 
                        users.users.map((user) => <UserChip user={user} key={user.clientId} />)
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
