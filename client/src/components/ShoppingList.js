import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { getItems } from '../actions/itemActions'

class ShoppingList extends Component {

    // for to check uuid is working, manually give some dummy data here. Later it will come from database
    // A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity on the Internet. Depending on the specific mechanisms used, a UUID is either guaranteed to be different or is, at least, extremely likely to be different from any other UUID generated until 3400 A.D.

   /*  state = {
        items: [
            {id: uuid(), name: 'Eggs'},
            {id: uuid(), name: 'Milk'},
            {id: uuid(), name: 'Water'},
            {id: uuid(), name: 'Steak'}
        ]
    } */

  render() {
      // use destructuring to declare variable items
      const { items } = this.state;
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


// When I bring in any action from redux, e.g. getItems its going to be stored as prop. And hence I am setting the PropTypes of getItems()
ShoppingList.PropTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

// what mapStateToProps() does is, it allows us to take our item state (from itemReducer.js ) and turn this into a component property so I can use it in this ShoppingList component - like e.g.
//this.props.items
const mapStateToProps = state => ({
    item: state.item
})

export default connect(
    mapStateToProps,
    { getItems }
)(ShoppingList)

/* In this line above < items: [...items, {id: uuid(), name }]  > the part for name is actually < name : name >
But with destructuring, since both side is same, I am just using name

connect() and mapStateToProps()

To change data, we need to dispatch an action to store.

On the other hand, when we want to retrieve data, we do not get it directly from the store. Instead, we get a snapshot of the data in the store at any point in time using store.getState() , which gives us the “state” of the application as on the time at which we called the getState method.

This is precisely what connect does. It maps the stores state and dispatch to the props of a component :

mapStateToProps and mapDispatchToProps are both pure functions that are provided the stores “state” and “dispatch” respectively. Furthermore, both functions have to return an object, whose keys will then be passed on as the props of the component they are connected to.

In this case, mapStateToProps returns an object with only one key : “item”.

Then the connected component (which is exported) provides item as props to ShoppingList component.

*/