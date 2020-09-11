import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router'

import { logoutUser } from '../actions/usersActions'

class NavigationBar extends Component{

    state={
        searchValue: '',
        renderSearchResults: false
    }

    handleLogout = () => {
        this.props.logoutUser()
    }

    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSearch = (event) => {
        event.preventDefault()
        this.setState({renderSearchResults: true})
        let searchTerm = this.state.searchValue
        this.setState({searchValue: ''})
        this.props.history.push(`/recipes/search/${searchTerm.replace(/\s+/g, '-').toLowerCase()}`)
    }

    renderLoginOrLogout = () => {
    
        if(!this.props.user.id){
            return (
                <>
                    <LinkContainer to="/signup">
                        <Nav.Link >
                            Sign Up
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Nav.Link >
                            Login
                        </Nav.Link>
                    </LinkContainer>
                </>
                
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
                <>
                <LinkContainer to={`/users/${this.props.user.id}/recipes`}>
                    <Nav.Link  >
                        Your Recipes
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/recipes/new">
                    <Nav.Link>
                        New Recipe
                    </Nav.Link>
                </LinkContainer>
                </>
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
            <Form onSubmit={this.handleSearch} inline>
                <FormControl type="text" name="searchValue" value={this.state.searchValue} onChange={this.handleOnChange} placeholder="Search" className="mr-sm-2" />
                <Button type="submit" variant="outline-info">Search</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar))