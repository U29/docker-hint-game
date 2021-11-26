import { Chip, Tooltip, ClickAwayListener, Grid } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import StarsIcon from '@mui/icons-material/Stars';
import styled from "@emotion/styled";
import { useState } from "react";
import RoomHostPlayerEditDialog from './RoomHostPlayerEditDialog';

const TestClientId = 'randomAAAA';
const clientId = TestClientId;

const CustomChip = styled(Chip)({
    padding: '20px', 
    height: '50px', 
    width: "200px",
    borderRadius: "100px", 
    fontSize: "medium",
    margin: "6px"
});

type PlayerChipType = {
    player: {
        name: string,
        isHost: boolean,
        clientId: string
    }
}

const PlayerChip = ( { player }:PlayerChipType ) => {
    // Tooltip State
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const handleTooltipOpen = () => {
        tooltipOpen ? setTooltipOpen(false) : setTooltipOpen(true);
    };
    const handleCloseTooltip = () => {
        setTooltipOpen(false);
    };
    const HostIcon = <Tooltip onClose={handleCloseTooltip} 
                    open={tooltipOpen} 
                    disableFocusListener 
                    disableHoverListener 
                    disableTouchListener
                    title="この部屋のホストです"
                    >
                    <StarsIcon />
                    </Tooltip>

    // Dialog State
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDialogValue, setSelectedDialogValue] = useState('');
    const handleClickPlayer = () => {
        console.log(player.name);
        setOpenDialog(true);
    };
    const handleCloseDialog = (value: string) => {
        setOpenDialog(false);
        setSelectedDialogValue(value);
    }

    return (
        <>
            <Grid item>
                {
                    !player.isHost ? 
                        <CustomChip icon={<FaceIcon />} label={player.name} onClick={handleClickPlayer} color={clientId===player.clientId ? "primary" : "default"} />
                        :
                        <ClickAwayListener onClickAway={handleCloseTooltip}>
                            <CustomChip icon={<FaceIcon />} deleteIcon={HostIcon} label={player.name} onClick={handleClickPlayer} onDelete={handleTooltipOpen} color={clientId===player.clientId ? "primary" : "default"} />
                        </ClickAwayListener>
                }
            </Grid>
                {/* // TODO: ホスト以外がユーザーをクリックできないように修正する。 */}
                <RoomHostPlayerEditDialog selectedDialogValue={selectedDialogValue} openDialog={openDialog} onClose={handleCloseDialog} playerName={player.name} />
        </>
    );
}

export default PlayerChip;