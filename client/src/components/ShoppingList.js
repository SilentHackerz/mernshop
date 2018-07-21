import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { getItems } from '../actions/itemActions'

class ShoppingList extends Component {

/* So, getItems() is the action defined in itemActions.js, and when its invoked or run, then it will dispatch this action type, which is 'GET_ITEMS' to the reducers. And then in the reducer will just return the state, and bring it into our component ( with code inside componentDidMount() ).

Because the itemReducer.js has the following form

 switch(action.type) {
        case GET_ITEMS:
            return {
                ...state
            }
*/

componentDidMount () {
    this.props.getItems()
}


  render() {

      // And note after implementing redux, on the RHS below, I will no more get the items from the state directly by doing this.state. Instead, I will do this.props.item . Because after redux, I have got rid of component state, instead getting my state from reducers from out store. And mapStateToProps has mapped those states to 'item' props.
      // Also, use destructuring to declare variable items. Because the actual code would have been
      // this.props.item.items  , where 'items' is the actual array.

    const { items } = this.props.item;

    return (
      <Container>
        <Button
            color="dark"
            style={{marginBottom: '2em'}}
            onClick={() => {
                const name = prompt('Enter Item');
                if (name) {
                    this.setState( state => ({
                        // Add this new item to the existing array of items with spread operator
                        items: [...items, {id: uuid(), name }]
                    }))
                }
            }}
        >Add Item
        </Button>
        <ListGroup>
            <TransitionGroup className="shopping-list">
                {items.map(({ id, name }) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={() => {
                                    this.setState(state => ({
                                        items: state.items.filter(item => item.id !== id)
                                    }));
                                }}
                                >&times;</Button>
                                {name}
                        </ListGroupItem>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}


// When I bring in any action from redux, e.g. getItems its going to be stored as prop. And hence I am setting the PropTypes of getItems() .
// And the other prop 'item' is coming from the object that is returned from mapStateToProps() - Because, as noted below, mapsStateToProps() has to return an object, whose keys will then be passed on as the props of the component they are connected to (ShoppingList in this case).

ShoppingList.PropTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

// what mapStateToProps() does is, it allows us to take our item state (from itemReducer.js ) and turn this into a component property so I can use it in this ShoppingList component - like e.g.
//this.props.items
// mapStateToProps() has the Store state as an argument and its used to link the component with certain part of the store state . In returned object from the function below, I am using 'item' as key because thats what I am calling it in my rootReducer (./reducers/index.js)
const mapStateToProps = state => ({
    item: state.item
})

export default connect(
    mapStateToProps,
    { getItems }
)(ShoppingList)

/* In this line above < items: [...items, {id: uuid(), name }]  > the part for name is actually < name : name >
But with destructuring, since both side is same, I am just using name

EXPLANATION ON - connect() method and it takes mapStateToProps() as its first argument.

To change data, we need to dispatch an action to store.

On the other hand, when we want to retrieve data, we do not get it directly from the store. Instead, we get a snapshot of the data in the store at any point in time using store.getState() , which gives us the “state” of the application as on the time at which we called the getState method.

This is precisely what connect does. It maps the stores state and dispatch to the props of a component :

mapStateToProps and mapDispatchToProps are both pure functions that are provided the stores “state” and “dispatch” respectively. Furthermore, both functions have to return an object, whose keys will then be passed on as the props of the component they are connected to (ShoppingList in this case).

In this case, mapStateToProps returns an object with only one key : “item”.

Then the connected component (which is exported) provides 'item' as props to ShoppingList component.

The return value of mapStateToProps() will be an object derived from state (as it lives in the store), whose keys will be passed to your target component (the component connect is applied to) as props. This means that the state as consumed by your target component can have a wildly different structure from the state as it is stored on your store.

It's called "connecting" your component or "making it smart". It's by design. It allows you to decouple your component from your state an additional time which increases the modularity of your code. It also allows you to simplify your component state as a subset of your application state which, in fact, helps you comply with the redux pattern. Think about it this way: a store is supposed to contain the entire text of your application. For large applications, this could contain dozens of properties nested many layers deep. You don't want to haul all that around on each call (expensive).

*/