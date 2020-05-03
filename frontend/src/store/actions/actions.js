import { types } from '../constants/constants'

export const getItems = (payload)  => {
    return { 
         type: types.GET_ITEMS,
         payload
    }
}

export const addItem = (payload)  => {
    return { 
         type: types.ADD_ITEM,
         payload
    }
}