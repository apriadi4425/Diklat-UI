import React from 'react';
import {Link} from 'react-router-dom'
import './login.css';

const Login = () => {
    return(
        <div className="container">
            <section id="content">
                <form action="">
                <h1 className='login'>Login Form</h1>
                <div>
                    <input type="text" placeholder="Username" required="" id="username" />
                </div>
                <div>
                    <input type="password" placeholder="Password" required="" id="password" />
                </div>
                <div>
                    <input type="submit" value="Log in" />
                    <Link to={'app/dashboard'}>TES</Link>
                </div>
                </form>
                
            </section>
            </div>
    )
}

export default Login;