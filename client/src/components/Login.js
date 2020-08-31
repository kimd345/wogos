import React from 'react';

import { apiUrl } from '../config';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    handleSubmit(e) {
        // console.log(this.state);
        async function fetchData(data) {
            const response = await fetch(`${apiUrl}/session/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.json();
        }
        fetchData(this.state);
        e.preventDefault();
    }

    updateEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return(
            <main>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        placeholder='Email' 
                        value={this.state.email}
                        onChange={this.updateEmail} />
                    <input
                        type='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.updatePassword} />
                    <button type='submit'>Log In</button>
                </form>
            </main>
        );
    }
};

export default Login;