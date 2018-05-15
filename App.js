import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

// redux
import { Provider } from 'react-redux';
import store from './store';

// react navigation
import { StackNavigator } from 'react-navigation';

// screen
import { DemoScreen } from './screens';

export default class App extends Component {

  render() {

    const MainNavigator = StackNavigator({
      
      Demo: {screen: DemoScreen}, 

    }, {
      model: 'modal'
    });

    return (
      <Provider store={store}>
          <MainNavigator />
      </Provider>
    );
  }
}
