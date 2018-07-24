import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items').then(res => {
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    })
}

// note on dispatch() >> I am using dispatch() to send the type along with the data that we get from the axios request to the backend

/* So, getItem is the action, and when its invoked or run, then it will dispatch this action type, which is 'GET_ITEMS' to the reducers. And then in the reducer will just return the state, and bring it into our component.

Because the itemReducer.js has the following form

 switch(action.type) {
        case GET_ITEMS:
            return {
                ...state
            }
*/

export const deleteItem = id => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

export const addItem = item => dispatch => {
    axios.post('/api/items', item).then(res => {
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
    })
}

export const setItemsLoading = item => {
    return {
        type: ITEMS_LOADING
    }
}