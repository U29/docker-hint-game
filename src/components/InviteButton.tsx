import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CopyToClipboard } from 'react-copy-to-clipboard'

type InviteButtonType = {
    roomId: string
}

const InviteButton = ( {roomId}:InviteButtonType ) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setCopied(false);
    };
    const inviteUrl = `${location.protocol}//${location.host}/join/${roomId}`;
    const [copied, setCopied] = useState(false);
    const handleCopyUrl = () => {
        setCopied(true);
    }
    return (
        <div>
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen} sx={{borderRadius: '100px'}}>招待する</Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>他のプレイヤーを招待する</DialogTitle>
            <DialogContent>
            <DialogContentText>
                以下のURLを教えてあげましょう。このルームのIDがセットされた状態のページに繋がります。
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="招待URL"
                type="email"
                fullWidth
                aria-readonly
                variant="standard"
                value={inviteUrl}
                onFocus={e => e.target.select()}
            />
            </DialogContent>
            <DialogActions>
                <CopyToClipboard text={inviteUrl}>
                    <Button onClick={handleCopyUrl}>{copied ? 'コピー完了！' : 'URLをコピー'}</Button>
                </CopyToClipboard>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default InviteButton;