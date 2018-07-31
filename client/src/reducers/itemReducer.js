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
                items: state.items.filter(item => item._id !== action.payload)
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

B> for case ADD_ITEM >> action.payload is the new item and its going to get added to items array along with the rest of the items (which is ...state.items)

B> In above, I am using the spread operator of 3 dots for returning the states ( ...states ) because I can not mutate the state

*/