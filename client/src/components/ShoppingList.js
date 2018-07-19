import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItems, Button } from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';

export default class ShoppingList extends Component {

    // for to check uuid is working, manually give some dummy data here. Later it will come from database
    // A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity on the Internet. Depending on the specific mechanisms used, a UUID is either guaranteed to be different or is, at least, extremely likely to be different from any other UUID generated until 3400 A.D.

    state = {
        items: [
            {id: uuid(), name: 'Eggs'},
            {id: uuid(), name: 'Milk'},
            {id: uuid(), name: 'Water'},
            {id: uuid(), name: 'Steak'}
        ]
    }

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
                    this.setState( state => {
                        // Add this new item to the existing array of items with spread operator
                        items: [...items, {id: uuid(), name }]
                    })
                }
            }}
        >Add Item</Button>
      </Container>
    )
  }
}


/* In this line above < items: [...items, {id: uuid(), name }]  > the part for name is actually < name : name >
But with destructuring, since both side is same, I am just using name
*/