import React from 'react'
import axios from "axios";
import { API_URL } from '..';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { Link } from 'react-router-dom';
export default function Register() {
  const [Gos,setGos] = React.useState(true);
  const navigate = useNavigate();
function submitHandler(e) {
  if (Gos) {

    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    console.log(email);
    axios.post(`${API_URL}get_code`, {email: email}).then((res) => setGos(false)).catch((err) => console.log(err));
    ;
  }
  else{
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');
  const code = formData.get('code');
  axios.post(`${API_URL}register`, {email: email, password: password, code: code}).then(navigate('/login')).catch((err) => console.log(err));
  }
}
  return (
    <div className="Register-from">
          <form action="" method='POST' onSubmit={(e) => submitHandler(e)}>
          <div className="zap">
            <h1 className="zap-h1">Пройдите регистрацию:</h1>
            <div className="line-reg">
              <input className='in-registr-email' type="text" name="email" placeholder='Email'/>
              {Gos===true ?<button type='submit' className="get-code">Получить код</button>
              :<input className='under-get-cod' type="text" name="code" placeholder='Код'/>}
            </div>
            <p className='p-register'>Введите Ваш контактный e-mail адрес. Вам будет отправлено проверочное сообщение с кодом.</p>
            <div className='pasword-reg'>
              <input className='w-90px' type="password" name="password" placeholder='Пароль'/>
              <p className="p-register">Придумайте пароль, потом вы сможете его поменять в личном кабинете.</p>
            </div>
            <div className='reg-check'> 
              <input className='checkbox' type="checkbox" name="code" placeholder='Код'/>
                <div className='p-register-un'>
                  <p className='p-register-un1'>Нажимая кнопку «Зарегистрироваться»: </p>
                  <p className='p-register-un1'>я принимаю условия пользовательского соглашения и даю согласие даю согласие на обработку моих персональных данных</p>
                </div>
            </div>   
              <button className="submit-reg" type='submit'>Зарегистрироваться</button>
              <div className='p-link-reg'>
                <p>Если у вас уже есть аккаунт, вы можете</p><Link to={'/login'} className='link-login'>войти</Link>
              </div>
            </div>
          </form>
        </div>
  )
}
