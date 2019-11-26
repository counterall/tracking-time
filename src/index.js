import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TrackApp from "./route";
import Store from "./store";
import idbCRUD from "./helpers/idbCRUD";
import * as serviceWorker from './serviceWorker';

class RootApp extends Component {
    render() {
        return (
            <Provider store={ Store }>
                <TrackApp />
            </Provider>
        );
    }
}

idbCRUD.init().then(() => {
    ReactDOM.render(<RootApp />, document.getElementById('root'));
}).catch((e) => {
    console.log("Failed to initialize indexedDB used by this app: " + e);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
