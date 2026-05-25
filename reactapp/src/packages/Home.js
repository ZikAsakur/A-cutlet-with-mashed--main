import './Home.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MapComp from '../components/MapComponents';
import calendar from '../static/img/calendar-app.png'
import romb from '../static/img/romb-app.png'
import { API_URL, API_MEDIA  } from '..';
import { useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
function App() {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState('');

  useEffect(() => {
  axios.get(API_URL + 'getTekEvent')
    .then(res => setEvents(res.data))
    .catch(err => console.log(err));
}, []);
  return (
    <div className='wrapper'>
      <Header/>
      <Message text={message} type={messageType} />
        <main>
            <MapComp width={551} height={551}/>
            
            <div className="events-grid">
            {events.map((event) => (
              <div className="event-card" key={event.id}>
                
                <div
                  className="event-image"
                  style={{
                    backgroundImage: event.image
                      ? `url(${API_MEDIA + event.image})`
                      : 'none'
                  }}
                />

                <div className="event-content">
                  <h1>{event.name}</h1>

                  <p>{event.type}</p>
                  <p>{event.age_group}</p>

                  <p>
                    {event.date_start.split('-')[2]}.{event.date_start.split('-')[1]}
                    {" - "}
                    {event.date_end.split('-')[2]}.{event.date_end.split('-')[1]}
                  </p>

                  <div className="buttons-group">
                    <button
                      className="link_home"
                      onClick={() => navigate(`/EventDescription/${event.id}`)}
                    >
                      Подробнее
                    </button>

                    {localStorage.getItem('token') ? (
                      <button
                        className="link_home"
                        onClick={() => {

                          axios.post(
                            API_URL + 'addEventToPerson',
                            { id: event.id },
                            {
                              headers: {
                                Authorization: 'Token ' + localStorage.getItem('token')
                              }
                            }
                          )
                          .then(() => {

                            setMessage('Вы успешно записались на мероприятие');
                            setMessageType('success');

                            setTimeout(() => {
                              setMessage('');
                            }, 3000);

                          })
                          .catch(err => {

                            if (err.response?.data?.error === 'You already have this event') {
                              setMessage('Вы уже записаны на это мероприятие');
                            } else {
                              setMessage('Ошибка при записи');
                            }

                            setMessageType('error');

                            setTimeout(() => {
                              setMessage('');
                            }, 3000);

                          });

                        }}
                      >
                        Записаться
                      </button>
                    ) : (
                      <Link className="link_home" to="/login">
                        Войти
                      </Link>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </main>
      <Footer/>
    </div>  
  );
}
 
export default App;
