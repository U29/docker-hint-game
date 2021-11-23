import { Box, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
const Title = () => {
    return (
        <Box sx={{
            textAlign: 'center',
            margin: '5% auto',
            maxWidth: '100vw'
        }}> 
            <Typography variant="h1" sx={{fontSize: '5vmin', fontWeight: 'bold'}}>PLEASE HINTS, PLEASE</Typography>
        </Box>
    );
}

export default Title;