import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {

    dispatch(setItemsLoading()); // because I want the loading to be set to true for now.

    axios.get('/api/items')
        .then(res => {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
        })
    })
}

/* note on dispatch() >> I am using dispatch() to send the type along with the data that we get from the axios request to the backend.
The main function (addItem) dispatches another function ( setItemsLoading ). This second function is called a thunk, and it returns the object/action.  the context of redux-thunk, a thunk is a second function that performs delayed logic by being asynchronously returned by a first function.

This double function strategy allows us to wait for an asynchronous operation (like fetching data) to complete, and then the action is returned by the thunk.

The plain data flows in a typical Redux - dispatch(action) -> reducer -> new state -> re-render

The adjusted order, including reducers, is: dispatch ➡️ action creator ➡️ thunk ➡️ action ➡️ reducer.
*/

/* So, getItems() function is the action, and when its invoked or run, then it will dispatch this action type, which is 'GET_ITEMS' to the reducers. And then in the reducer I will just return the state ( with spread operator ...state), and bring it into my component. And the way, I invoke this function in my reducer is by doing the ``action.type`` and then applying various cases. And because of the mechanism of ``dispatch`` function, when I apply ``action.type`` and case ``GET_ITEM`` I dispatch ``getItems()`` function from my action to reducer.

By the mechanism of dispatch() - I am using dispatch() to send the type along with the data that we get from the axios request to the backend. And note, that the main function getItem() dispatches another function ( setItemsLoading ). This second function is called a thunk, and it returns the object/action. In the context of redux-thunk, a thunk is a second function that performs delayed logic by being asynchronously returned by a first function.

Because the itemReducer.js has the following form

 switch(action.type) {
        case GET_ITEMS:
            return {
                ...state
            }
*/

// Note the pattern is one of function currying - i.e. one function returning another function while taking single or no argument
export const addItem = item => dispatch => {
    axios.post('/api/items', item)
    .then(res => {
        dispatch({
            type: ADD_ITEM,
            payload: res.data
        })
    })
}
// payload is the new item. from here the post hits my backend routes router.post which saves this res.data into mongo database.


export const deleteItem = id => dispatch => {
    axios.delete(`/api/items/${id}`).then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    );
  };

export const setItemsLoading = item => {
    return {
        type: ITEMS_LOADING
    }
}