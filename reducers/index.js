import { combineReducers } from 'redux';

// reducers
import {
    DemoReducer,
} from '../screens'

export default combineReducers({

    demo: DemoReducer,
})