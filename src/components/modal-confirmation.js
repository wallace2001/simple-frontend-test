import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useSelector } from 'react-redux';

const DeleteModalConfirmation = () => {
    const { open, onClose, onConfirm } = useSelector((state) => state.modal);

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Confirmação de Deleção</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem certeza de que deseja excluir este Usuário?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DeleteModalConfirmation.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default DeleteModalConfirmation;
