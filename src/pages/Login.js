import React, {useState, useCallback, useContext} from 'react';
import {withRouter, Redirect} from 'react-router-dom'
import axios from 'axios';
import './login.css';
import swal from 'sweetalert';
import { GlobalStateContext } from '../GlobalState';
import LogoMA from '../assets/logo-ma.png';


const Login = ({history}) => {
    const {setOtoritas} = useContext(GlobalStateContext)
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

    const CobaLogin = useCallback(async (e) => {
        e.preventDefault();
        SetLoading(true);
        await axios({
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
          setOtoritas(res.data.user.otoritas)
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
        <div className="container-fluid login_background">
            {localStorage.getItem('login') ? <Redirect to={'/app/beranda'}/> : null}
            <div className='row'>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <br/>
                            <br/>
                            <br/>
                            <img src={LogoMA} width='150px'/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4 col-xs-offset-4">
                            <div className="content_login">
                                <form>
                                    <h1 className='login text-center'>SI-STUDILA</h1>
                                    <div>
                                        <span className='text_label'>Email</span>
                                        <input  type="text" className={'form-control'} placeholder="Email" required value={Form.email} onChange={(e) => HandleForm(e, 'email')} id="email" />
                                    </div>
                                    <div>
                                        <br/>
                                        <span className='text_label'>Password</span>
                                        <input type="password" className={'form-control'}  placeholder="Password" value={Form.password} onChange={(e) => HandleForm(e, 'password')}  id="password" />
                                    </div>
                                    <div>
                                        <br/>
                                        <input type="submit" className='btn btn-success btn-block' disabled={Loading} value={!Loading ? "Log in" : 'Loading...'} onClick={CobaLogin} />
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);
