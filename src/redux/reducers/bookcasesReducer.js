import { combineReducers } from 'redux';

const bookcases = (state = '', action) => {
    switch (action.type) {
        case ('ADD_BOOKCASES'):
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    bookcases
});