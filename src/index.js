import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Users from './components/users';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import { fetchUsersData } from './actions';

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchUsersData());

ReactDOM.render(<Provider store={store}><Router><React.Fragment>
    <Switch>
        <Route exact path="/users"><Users /></Route>
        <Route exact path="/"><App /></Route>
    </Switch></React.Fragment></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
