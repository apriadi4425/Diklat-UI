import React, {useState, useCallback} from 'react';
import {withRouter, Redirect} from 'react-router-dom'
import axios from 'axios';
import './login.css';
import swal from 'sweetalert';


const Login = ({history}) => {

    const [Form, SetForm] = useState({
        email : '', password : ''
      });
    
      const [Error, SetError] = useState([]);
      const [Loading, SetLoading] = useState(false);
    
      const HandleForm = (e, param) => {
        SetError([])
        if(param === 'email'){
          SetForm({...Form, email: e.target.value})
        }else{
          SetForm({...Form, password: e.target.value})
        }
      }

    const CobaLogin = useCallback((e) => {
        e.preventDefault();
        SetLoading(true);
        axios({
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/api/login`,
          data: Form,
          config: { headers: {
              'Accept': 'application/json'
            }}
        }).then(res => {
          localStorage.setItem('login', true);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('token', JSON.stringify(res.data.token));
          history.push('/app/beranda')
        console.log(res.data)
        }).catch(function (error) {
          if(error.response){
           if(error.response.status === 401){
            swal("Idetifikasi gagal", "Email atau password salah", "error");
           }
          }
          
        });
        SetLoading(false);
      },[Form, history])


    return(
        <div className="container">
            {localStorage.getItem('login') ? <Redirect to={'/app/beranda'}/> : null}
            <section id="content">
                <form>
                <h1 className='login'>Login Form</h1>
                <div>
                    <input type="text" placeholder="Email" required value={Form.email} onChange={(e) => HandleForm(e, 'email')} id="email" />
                </div>
                <div>
                    <input type="password" placeholder="Password" value={Form.password} onChange={(e) => HandleForm(e, 'password')}  id="password" />
                </div>
                <div>
                    <input type="submit" disabled={Loading} value={!Loading ? "Log in" : 'Loading...'} onClick={CobaLogin} />
                </div>
                </form>
                
            </section>
            </div>
    )
}

export default withRouter(Login);