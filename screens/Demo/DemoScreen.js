import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

// redux
import { connect } from 'react-redux';
import actions from './actions';

// styled-components
import { Container } from '../../styles/grid';

// native base
import { Icon } from 'native-base';

class DemoScreen extends Component{

    static navigationOptions = {
        header: null
    }

    handleBtnPress = () => {
        this.props.test("my new message");
    }

    render(){
        return(
            <Container>
                <Icon name='home' />
                <Text>{this.props.message}</Text>
                <TouchableOpacity onPress={() => this.handleBtnPress()}>
                    <Text>test</Text>
                </TouchableOpacity>
            </Container>
        )
    }
}

const stateToProps = (state) => {
    return {
        message: state.demo.message
    }
}

const dispatchToProps = (dispatch) => {
	return {
        test: (message) => dispatch(actions.test(message)),
	}
}

export default  connect(stateToProps, dispatchToProps)(DemoScreen);