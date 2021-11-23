import { Button, ButtonGroup, Typography, Box } from "@mui/material";
import SocketManager from "./SocketManager";

const DebugButtons = () => {
    return (
        <Box sx={{textAlign: 'center', border: '1px solid gray', margin: '40% 0 0 0', padding: '5%', borderRadius: '10px'}}>
            <Typography variant="h6">Debug page button</Typography>
            <ButtonGroup variant="contained" color="warning" >
                <Button href="/">Top Page</Button>
                <Button href="/join/1234">招待ページ</Button>
                <Button href="/room/1234">Room Page</Button>
            </ButtonGroup>
        </Box>
    );
}

export default DebugButtons;