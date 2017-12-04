import React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import store, { history } from "../store";
import client from "../apolloClient";

import SongList from "./SongList";
import SongCreate from "./SongCreate";

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className="container App">
                        <Switch>
                            <Route exact path="/" component={SongList} />
                            <Route path="/songs/new" component={SongCreate} />
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        </ApolloProvider>
    );
};

export default App;
