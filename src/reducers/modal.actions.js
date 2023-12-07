export const actions = {
  showModalConfirmDelete: (onClose, onConfirm) => ({
    type: 'OPEN_MODAL_CONFIRM_DELETE',
    payload: { onClose, onConfirm },
  }),
  hideModalConfirmDelete: () => ({
    type: 'CLOSE_MODAL_CONFIRM_DELETE'
  }),
};
