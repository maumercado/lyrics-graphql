import { combineReducers } from "redux";
import { reducer as form } from "redux-form";

const rootReducer = combineReducers({
    form,
    state: (state = {}) => state
});

export default rootReducer;
