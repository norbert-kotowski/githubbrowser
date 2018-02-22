/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput, Image, TouchableHighlight, ActivityIndicator
} from 'react-native';
import authService from './AuthService';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            showProgress: false
        };
    }

    render() {
        let errorCtrl = <View/>;
        if(!this.state.success && this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>That username and password combination did not work</Text>
        }

        return (
            <View style={styles.container}>
                <Image source={{uri: 'https://recast.ai/blog/wp-content/uploads/2016/03/Octocat-github-1.png'}}
                       style={styles.logo}/>
                <Text style={styles.heading}>Github Browser</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Github username"
                    onChangeText={(text) => this.setState({username: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Github password"
                    secureTextEntry="true"
                    onChangeText={(text) => this.setState({password: text})}
                />
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
                {errorCtrl}
                <ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader}/>

            </View>
        );

    }

    onLoginPressed() {
        console.log('Login attempting: ' + this.state.username);
        this.setState({showProgress: true});
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (result)=> {
            this.setState(result);
            this.setState({showProgress: false});
            if(result.success && this.props.onLogin) {
                this.props.onLogin();
            }
        })

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
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10
    }
});