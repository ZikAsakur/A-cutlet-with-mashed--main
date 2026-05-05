import './header.css';
import { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import event from '../static/img/event.png';
import region from '../static/img/region.png';
import axios from "axios";
import { API_URL } from '../index';
import { useNavigate } from 'react-router-dom';
import Analytics from '../static/img/Analytics.png';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const month = new Date().getMonth()+1
  const year = new Date().getFullYear()
  useEffect(() => {
    document.title = "Header";
  }, []);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return;
    }
    axios.get(API_URL + 'personalInfo', {  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => {
      const data = res.data
    }).catch(err => {
      console.log(err)
    })
  })
  return (
    <header>
      <Link to={"/"} className="logo"></Link>
      <>  
        <ul className="ul-header">
          <div className="fix-header">
            <Link to={`/Event/${month}/${year}`} className={location.pathname === `/Event/${month}/${year}` ? "Event-active" : "Event"}>
              <img src={event}  alt='' className="Event-img"/>
              <h1 className="event-h1">События</h1>
            </Link>
            <Link to="/" className={location.pathname === "/" ? "Region-active" : "Region"}>
              <img src={region}  alt='' className="Region-img"/>
              <h1 className="regions-h1">Список регионов</h1>
            </Link>
            <Link to="/Analytics" className={location.pathname === "/Analytics" ? "Analytics-active" : "Analytics"}>
              <img src={Analytics}  alt='' className="Region-img"/>
              <h1 className="regions-h1">Анализ</h1>
            </Link>
          </div>
          {localStorage.getItem('token') ?
            <div className='Personal-profile'> 
              <Link to="/PersonalAccountUser" className={location.pathname === "/PersonalAccountUser" ? "personal_info-active" : "personal_info"}>Личный кабинет</Link>
              <button onClick={() => {localStorage.removeItem('token')
                navigate('/')
              }} className="register-header">Выход</button>
            </div> : 
            <div className='ul-header'>
              <Link to="/login" className={location.pathname === "/login" ? "rounded active" : "rounded"}>Вход</Link>
              <Link to ="/register" className={location.pathname === "/register" ? "register-header active" : "register-header"}>Регистрация</Link>
            </div>
          }
        </ul>
      </>  
    </header> 
  )
}

export default Header 