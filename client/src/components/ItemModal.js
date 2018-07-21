// This component is actually a container. A container is component , where I am using a Redux state inside of a React component.
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

export default class ItemModal extends Component {

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
            name: this.state.name;
        }

        // add item via addItem() action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();

    }


  render() {
    return (
      <div>

      </div>
    )
  }
}
