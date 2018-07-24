import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

// The 'loading' state will only only turn to true, during the process of the data fetching and once the date is fetched it will turn back to false

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
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        default:
            return state;
    };
}

/* In above, I am using the spread operator of 3 dots because I can not mutate the state

For checking uuid is working, manually give some dummy data here in the above. Later it will come from database

A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity on the Internet. Depending on the specific mechanisms used, a UUID is either guaranteed to be different or is, at least, extremely likely to be different from any other UUID generated until 3400 A.D. */