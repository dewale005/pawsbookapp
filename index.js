/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import configureStore from './src/store/configureStore'
console.disableYellowBox = true;

const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
