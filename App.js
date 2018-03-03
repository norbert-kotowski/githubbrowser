/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import Login from './Login'
import authService from './AuthService'

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLogedIn: false,
            checkingAuth: true
        };
    }

    componentDidMount() {
        authService.getAuthInfo((err, authInfo) => {
            this.setState({
                    checkingAuth: false,
                    isLogedIn: authInfo != null
                }
            )
        })
    }

  render() {
    if(this.state.checkingAuth) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} size="large" style = {styles.loader}
                ></ActivityIndicator>
            </View>
        )
    }

    if(this.state.isLogedIn) {
      return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Logged In</Text>
          </View>
      );
    }else {
      return (
         <Login onLogin={this.onLogin.bind(this)}/>
      );
    }

  }
  onLogin() {
    console.log('succesfully loged in, can show different view');
    this.setState({isLogedIn: true})
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center'
    },
    welcome: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loader: {

    }
});