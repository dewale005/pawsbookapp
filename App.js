/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme} from './src/util/custom-theme.json'
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import MainApp from './src/navigation/MainApp';
import { navigationRef } from './src/util/navigation';
import { connect } from 'react-redux';

const App = ({ app }) => {
  const appMode = app ? eva.dark : eva.light; 
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...appMode, ...theme}}>
        <StatusBar backgroundColor={app ? "#1A2138" : "#F7F9FC"} barStyle={app ? "light-content" : "dark-content" } />
        <MainApp />
      </ApplicationProvider>
    </>
  );
};

const mapStateToProps = state => {
  return {
    app: state.mode.isDarkMode
  }
}

export default connect(mapStateToProps)(App);
