import { Chip, Tooltip, ClickAwayListener, Grid } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import StarsIcon from '@mui/icons-material/Stars';
import styled from "@emotion/styled";
import { useState } from "react";
import RoomHostUserEditDialog from "./RoomHostUserEditDialog";

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

type UserChipType = {
    user: {
        name: string,
        isHost: boolean,
        clientId: string
    }
}

const UserChip = ( { user }:UserChipType ) => {
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
    const handleClickUser = () => {
        console.log(user.name);
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
                    !user.isHost ? 
                        <CustomChip icon={<FaceIcon />} label={user.name} onClick={handleClickUser} color={clientId===user.clientId ? "primary" : "default"} />
                        :
                        <ClickAwayListener onClickAway={handleCloseTooltip}>
                            <CustomChip icon={<FaceIcon />} deleteIcon={HostIcon} label={user.name} onClick={handleClickUser} onDelete={handleTooltipOpen} color={clientId===user.clientId ? "primary" : "default"} />
                        </ClickAwayListener>
                }
            </Grid>
                {/* // TODO: ホスト以外がユーザーをクリックできないように修正する。 */}
                <RoomHostUserEditDialog selectedDialogValue={selectedDialogValue} openDialog={openDialog} onClose={handleCloseDialog} userName={user.name} />
        </>
    );
}

export default UserChip;