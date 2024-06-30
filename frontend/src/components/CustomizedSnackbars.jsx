import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import propTypes from 'prop-types';

export default function CustomizedSnackbars({ message, severity = "success", open, handleClose }) {
    return (
        <Snackbar
            open={open} autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

CustomizedSnackbars.propTypes = {
    message: propTypes.string.isRequired,
    severity: propTypes.string,
    open: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired,
};