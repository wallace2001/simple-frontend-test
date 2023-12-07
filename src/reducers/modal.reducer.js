const initialState = {
  open: false,
  onClose: () => { },
  onConfirm: () => { },
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'OPEN_MODAL_CONFIRM_DELETE':
      return {
        ...state,
        open: true,
        onClose: action.payload.onClose,
        onConfirm: action.payload.onConfirm,
      };
    case 'CLOSE_MODAL_CONFIRM_DELETE':
      return {
        ...state,
        open: false,
        onClose: () => {},
        onConfirm: () => {},
      };
    default:
      return state;
  }
};

export default reducer;
