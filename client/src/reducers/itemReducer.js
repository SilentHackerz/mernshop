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
                ...state,
                items: action.payload,
                loading: false
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
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    };
}

/* A> Explanation of setting < loading: false >  withing GET_ITEMS -  This is so, because before I made the request for GET_ITEMS in itemActions.js I invoke setItemsLoading() with < dispatch(setItemsLoading()) > and setItemLoading() makes a request to reducers (itemReduces.js) ( case: ITEMS_LOADING ) setting the loading to true. That is, it is set to true, before I make the request.
So, after we make the request, when the items load (meaning I get the data / payload from backend ) I have to set loading back to false

And I can see this effect live in Redux dev-tool, under the Diff > Tree the loading will turn from true to false after I get the items

B> In above, I am using the spread operator of 3 dots for returning the states ( ...states ) because I can not mutate the state

C> Initially for checking uuid is working, manually give some dummy data here in the above, which I shall delete once my backend is fully configured. Later it will come from database

A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity on the Internet. Depending on the specific mechanisms used, a UUID is either guaranteed to be different or is, at least, extremely likely to be different from any other UUID generated until 3400 A.D. */