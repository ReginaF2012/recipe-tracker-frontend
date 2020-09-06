import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

class NavigationBar extends Component{

    handleLogout = (event) => {
        
    }

    renderLoginOrLogout = () => {
    
        if(!this.props.user.id){
            return (
                <Nav.Link href="/login" >
                   Login
                </Nav.Link>
            )
        } else {
            return (
                <Nav.Link onClick={this.handleLogout} href="/recipes" >
                  Logout
                </Nav.Link>
            )
        }
    }

     render(){
        return (
        <Navbar bg="light" variant="light">
            < Navbar.Brand href="#home">Recipe Tracker</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/recipes" >
                  Recipes
                </Nav.Link>

                {this.renderLoginOrLogout()}

                <Nav.Link href="#" >
                    
                </Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
         )
     }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NavigationBar)