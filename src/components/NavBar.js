import React from 'react';
import { Component } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

export default class NavigationBar extends Component{
     render(){
        return (
        <Navbar bg="light" variant="light">
            < Navbar.Brand href="#home">Recipe Tracker</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/recipes" >
                  Recipes
                </Nav.Link>
                <Nav.Link href="/login" >
                   Login
                </Nav.Link>
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