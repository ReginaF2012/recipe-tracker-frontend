import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { logoutUser } from '../actions/usersActions'

class NavigationBar extends Component{

    handleLogout = (event) => {
        this.props.logoutUser()
    }

    renderLoginOrLogout = () => {
    
        if(!this.props.user.id){
            return (
                <LinkContainer to="/login">
                    <Nav.Link >
                        Login
                    </Nav.Link>
                </LinkContainer>
                
            )
        } else {
            return (
                <Nav.Link  onClick={this.handleLogout} >
                  Logout
                </Nav.Link>
            )
        }
    }

    renderLoggedInLinks = () => {
        if(!!this.props.user.id){
            return (
                <LinkContainer to={`/users/${this.props.user.id}/recipes`}>
                    <Nav.Link  >
                        Your Recipes
                    </Nav.Link>
                </LinkContainer>
                
            )
        }
    }

     render(){
        return (
        <Navbar bg="light" variant="light">
            < Navbar.Brand href="#home">Recipe Tracker</Navbar.Brand>
            <Nav className="mr-auto">
                <LinkContainer to="/recipes">
                    <Nav.Link>
                        All Recipes
                    </Nav.Link>
                </LinkContainer>
                

                
                {this.renderLoggedInLinks()}
                {this.renderLoginOrLogout()}

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

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)