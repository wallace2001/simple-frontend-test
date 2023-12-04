import { types as routes } from "./routes.actions";

const initialState = { open: false, message: '', severity: '' };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_NOTIFICATION":
            return {
                ...state,
                data: {
                    open: true,
                    message: action.payload.message,
                    severity: action.payload.severity,
                },
            };
        case "HIDE_NOTIFICATION":
            return {
                ...state,
                data: {
                    open: false,
                    message: '',
                    severity: '',
                },
            };
        default:
            return state;
    }
};

export default reducer;