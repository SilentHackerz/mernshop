// This component is actually a container. A container is component , where I am using a Redux state inside of a React component. Because note, while we have the application state in redux store, but here in this component I am again declaring some states.
import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';
  import { connect } from 'react-redux';
  import { addItem } from '../actions/itemActions';
  import uuid from 'uuid';

class ItemModal extends Component {

    // In above, modal: false just basically means if the modal is open or not
    state = {
        modal: false,
        name: ''
    }


    // function to toggle state.modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    // in below I am using ES-6 destructuring to assign value of e.target.name
    onChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }

    //on submit from Add new button, invoke addItem() function
    onSubmit = e => {

        e.preventDefault();

        const newItem = {
            id: uuid(),
            name: this.state.name
        }

        // add item via addItem() action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();

    }


  render() {
    return (
      <div>
        <Button
            color="dark"
            style= {{ marginBottom: '2rem' }}
            onClick={this.toggle}
        >
        Add Item
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(
    mapStateToProps,
    { addItem }
)(ItemModal)


/*
1> What is modal - https://webdesign.tutsplus.com/articles/modal-and-modeless-boxes-in-web-design--webdesign-2282

Put simply, a modal box is a scripted effect that allows you to overlay a small element over a website. The primary benefit of modal boxes it that they avoid the need to use of conventional window pop-ups or page reloads. In short, modal dialog windows are a means to swiftly show information to users on the same page they are working on, thus improving the usability of your site and decreasing unnecessary page reloads.

2> My implementation above is almost per the documentation
https://reactstrap.github.io/components/modals/

*/