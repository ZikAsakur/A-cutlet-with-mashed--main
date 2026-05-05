import React from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '..';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './resetpassword.css';
export default function ForgotPassword() {
    const navigate = useNavigate();
    function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const password = formData.get('password');
        const url = new URL(window.location.href);
        const email = url.pathname.split('/')[3];
        
        axios.post(`${API_URL}resetPassword/${email}`, {password: password}).then((res) => navigate('/')).catch((err) => console.log(err));
        ;
    }
    const url = new URL(window.location.href);
    console.log(url.pathname.split('/')[3]);
    
    return (
            <div className="wraper">
                    <div className="login-container">
                        <form action="" method='POST' onSubmit={(e) => submitHandler(e)}>
                            <div className="reset-div">
                                <input placeholder='ПАРОЛЬ' className="reset-pass" type="password" name='password'/>
                                    <input placeholder='ПАРОЛЬ' className="reset-pass" type="password" name='password_check'/>
                                <button type="submit" className="update-password">Обновить Пароль</button>
                            </div>
                        </form>
                    </div>
                </div>
    )
}

