import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export const history = createHistory();
const logger = createLogger({
    duration: true,
    diff: true
});

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== "production") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
    middleware.push(logger);
}

const initialState = {};
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

if (module.hot) {
    module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer);
    });
}

export default store;
