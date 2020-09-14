import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

export default function UserAuthForm({user, handleOnChange, handleSubmit, isLogin}){

    // this form is for login and sign up

    // password confirmation is only required for sign up, so it's broken it out into a separate function to be called on sign up forms
    const renderPassConf = () => {
        return (
            <Form.Group>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" value={user.password_confirmation} name="password_confirmation" onChange={(event)=> handleOnChange(event)} placeholder="Enter Password Confirmation"/>
            </Form.Group>
        )
    }


    return (
        <Container>
            <h1>{ isLogin ? "Login" : "Sign Up"}</h1>
            <Form onSubmit={handleSubmit} id="login-form">
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control required onChange={(event)=> handleOnChange(event)} type="text"placeholder="Enter Username" name="username" value={user.username}/>
                    <Form.Text id="passwordHelpBlock" muted>
                         Must be 3-20 characters long.
                         Contain only letters, numbers, and underscores.
                    </Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required onChange={(event)=> handleOnChange(event)} type="email"name="email" value={user.email} placeholder="Enter email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control required onChange={(event)=> handleOnChange(event)} type="password"name="password" value={user.password} placeholder="Password" />
                    <Form.Text id="passwordHelpBlock" muted>
                         Must be 8-20 characters long.
                         Contain 1 capital letter.
                         Contain 1 lowercase letter.
                         Contain 1 Symbol.
                    </Form.Text>
                </Form.Group>
                { !isLogin && renderPassConf()}
                <Button variant="primary" type="submit">
                       { isLogin ? "Login" : "Sign Up"}
                </Button>
            </Form>
        </Container>
    )
}