import React from 'react'
import './login.css';
import './forgotPassword.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '..';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ForgotPassword() {
    const navigate = useNavigate();
    function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        axios.post(`${API_URL}forgotPassword`, {email: email}).then((res) => navigate('/')).catch((err) => console.log(err));
        ;
    }
    return (
        <div className="login-container">
            <form action="" method='POST' onSubmit={(e) => submitHandler(e)}>
                <div className="forgot-email">
                    <input placeholder='ЭЛЕКТРОННАЯ ПОЧТА' className="email-forgot" type="email" name='email'/>
                    <button className="submit-forgot" type="submit">Отправить на почту</button>
                </div>
                </form>
            </div>
    )

}

export default ForgotPassword