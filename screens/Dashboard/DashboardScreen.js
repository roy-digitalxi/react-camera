import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
    Text,
} from 'react-native';

// redux
import { connect } from 'react-redux';
import actions from './actions';

// styled-components
import { Container } from '../../styles/grid';

// native base
import { Icon } from 'native-base';

class DashboardScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {

        };
    }    

    render() {
        return (
            <View>
               <Text>123</Text> 
            </View>
        )
    }
}

const styles = {
    
};

const stateToProps = (state) => {
    return {
        
    }
}

const dispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(stateToProps, dispatchToProps)(DashboardScreen);