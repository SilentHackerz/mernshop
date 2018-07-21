import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [
        {id: uuid(), name: 'Eggs'},
        {id: uuid(), name: 'Milk'},
        {id: uuid(), name: 'Water'},
        {id: uuid(), name: 'Steak'}
    ]
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }
        default:
            return state;
    };
}

/* For checking uuid is working, manually give some dummy data here in the above. Later it will come from database

A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity on the Internet. Depending on the specific mechanisms used, a UUID is either guaranteed to be different or is, at least, extremely likely to be different from any other UUID generated until 3400 A.D. */