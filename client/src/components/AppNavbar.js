import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'

// https://reactstrap.github.io/components/navbar/ - Great library that allows me to use Bootstrap in a React type of way. For example I can just do <Navbar></Navbar> within the render method.

export default class AppNavbar extends Component {

    state = {
        isOpen: false
    };

    // Note with the above set up of declaring the state and given below I am using arrow function for defining toggle(), I dont need to use separate bind() to bind the toggle function inside the constructor
    //  this.toggle = this.toggle.bind(this)

    // toggle function to reverse the state of isOpen
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">Shopping List</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/rohan-paul">
                                Github
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
      </div>
    )
  }
}
