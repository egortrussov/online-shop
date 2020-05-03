import { types } from '../constants/constants'
import { combineReducers } from 'redux'

const initState = {
    items: []
}

const rootReducer = (state = initState, action) => {
    if (action.type === types.GET_ITEMS) {
        return {
            ...state
        }
    }
    if (action.type === types.ADD_ITEM) {
        state.items.push(action.payload);
    }
    return state;
}

export default rootReducer;