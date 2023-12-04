import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../reducers/notification.actions';

const Notification = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.notification);
    const { open, message, severity } = data || {};
  
    useEffect(() => {
      if (open) {
        const timeoutId = setTimeout(() => {
          dispatch(actions.hideNotification());
        }, 3000);
  
        return () => clearTimeout(timeoutId);
      }
    }, [open, dispatch]);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      dispatch(actions.hideNotification());
    };

    return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {/* Check if severity is a string before rendering the Alert */}
      {typeof severity === 'string' ? (
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

export default Notification;