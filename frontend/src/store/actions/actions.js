import { types } from '../constants/constants'

export const addItem = (payload)  => {
    return { 
         type: types.ADD_ITEM,
         payload
    }
}