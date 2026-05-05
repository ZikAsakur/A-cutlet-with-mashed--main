import './Home.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MapComp from '../components/MapComponents';
import calendar from '../static/img/calendar-app.png'
import romb from '../static/img/romb-app.png'
import { API_URL } from '..';
import { useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  useEffect (() => {
    axios.get(API_URL + 'getTekEvent')
    .then(res => {
      console.log(res.data)
      setData(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <div className='wrapper'>
      <Header/>
        <main>
            <MapComp width={551} height={551}/>
            
            <div className="app-block-2">
              <div className="block-2-1">
                <h1 className="h1-block-2">{data.name}</h1>
                <p className="p-block-2"></p>
                </div>

              <div className="block-2-2">
                <div className="block-2-2-1">
                  <img src={calendar} alt="" />
                  <h1 className="h1-block-2-2">{data.date_start ? <>{data.date_start.split('-')[1]}.{data.date_start.split('-')[2]} - {data.date_end.split('-')[1]}.{data.date_end.split('-')[2]} </>: ''}</h1>
                </div>
                <div className="block-2-2-1">
                  <img src={romb} alt="" />
                  <h1 className="h1-block-2-2">{data.type}</h1>
                </div>
              </div>
              {
                localStorage.getItem('token') 
                ? (
                  <Link className='link_home' onClick={() => {
                    axios.post(API_URL + 'addEventToPerson', {id: data.id}, { headers: {'Authorization': 'Token ' + localStorage.getItem('token')} }).then(res => {
                      navigate('/personalAccountUser')
                    })
                  }}>Записаться</Link>
                )
                : (
                  <Link className='link_home' to="/login">Зарегистрироваться</Link>
                )
              }
              
            </div>
        </main>
      <Footer/>
    </div>  
  );
}
 
export default App;
