import { Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material";

type RoomHostUserEditDialogType = {
    openDialog: boolean,
    selectedDialogValue: string,
    onClose: (value: string) => void,
    userName: string
  }
  
const RoomHostUserEditDialog = ({ onClose, selectedDialogValue, openDialog, userName }:RoomHostUserEditDialogType) => {
const handleClose = () => {
    onClose(selectedDialogValue);
};

const handleListItemClick = (value: string) => {
    onClose(value);
};

const menus = ['ホストを渡す', '追放する'];

return (
    <Dialog onClose={handleClose} open={openDialog}>
    <DialogTitle>{userName}</DialogTitle>
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

export default RoomHostUserEditDialog;