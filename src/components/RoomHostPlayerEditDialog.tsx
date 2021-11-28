import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material";

type RoomHostPlayerEditDialogType = {
    openDialog: boolean,
    selectedDialogValue: string,
    onClose: (value: string) => void,
    playerName: string
  }
  
const RoomHostPlayerEditDialog = ({ onClose, selectedDialogValue, openDialog, playerName }:RoomHostPlayerEditDialogType) => {
const handleClose = () => {
    onClose(selectedDialogValue);
};

const handleListItemClick = (value: string) => {
    onClose(value);
};

const menus = ['ホストを渡す', '追放する', '閉じる'];

return (
    <Dialog onClose={handleClose} open={openDialog}>
    <DialogTitle>{playerName}</DialogTitle>
    <List sx={{ pt: 0}}>
        {
            menus.map((menu) => (
                <ListItem button onClick={() => handleListItemClick(menu)} key={menu}>
                    <ListItemText primary={menu} sx={{textAlign: 'center'}} />
                </ListItem>
            ))
        }
    </List>
    </Dialog>
);
}

export default RoomHostPlayerEditDialog;