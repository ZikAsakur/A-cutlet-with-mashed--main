import React from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '..';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
    function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        axios.post(`${API_URL}login`, {email: email, password: password}).then(
            (res) => { localStorage.setItem('token', res.data.token);
              navigate('/')}).catch((err) => console.log(err));
        console.log(email, password);
    }
  return (

      <div className="Login-form">
          <form action="" method='POST' onSubmit={(e) => submitHandler(e)}>
            <div className="login-background">
              <div className="login">
                  <h1 className='login-h1'>АВТОРИЗИРУЙТЕСЬ, ЧТОБЫ ПРОДОЛЖИТЬ!</h1>
                <div className="line-login">
                  <input className="email-login" placeholder='ЭЛЕКТРОННАЯ ПОЧТА' type="email" name="email" />
                  <input className="password-login" placeholder='ПАРОЛЬ' type="password" name='password' />
                  <button type='submit' className="submit-login">ВОЙТИ</button>
                </div>
                  <div className="under-login">
                    <Link to='/forgotPassword' className="password-recovery">ЗАБЫЛИ ПАРОЛЬ</Link>
                    <Link to="/register" className="register-login">РЕГИСТРАЦИЯ</Link>
                  </div>
              </div>
            </div>
          </form> 
      </div>
    
  )
} 
