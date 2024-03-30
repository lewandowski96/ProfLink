// material-ui
import { DeleteOutline } from "@mui/icons-material";
import { Avatar, Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// store
import { dispatch } from "../../../store";
import { deleteBusiness } from "../../../store/reducers/business";


// ==============================|| Business - DELETE ||============================== //

export default function AlertBusinessDelete({ title, open, handleClose, deleteId }) {

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <DeleteOutline />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to delete?
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={() => {
              // API call 
              dispatch(deleteBusiness(deleteId))
              handleClose()
            }}
              autoFocus
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog >
  );
}
