import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_MEDIA, API_URL } from '..';
import './OrganizationInfo.css';
import './userevents.css';
import TypeImg from '../static/img/TypeImg.png';
import user_icon from '../static/img/user_icon.png';
import { useNavigate } from 'react-router-dom';
import loopa from '../static/img/loopa.png';
import Message from '../components/Message';

function UseEvents() {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [pages, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const url = new URL(window.location.href);
    const year = url.pathname.split('/')[2];
    const month = url.pathname.split('/')[3];
    const day = url.pathname.split('/')[4];

    const fetchEvents = async () => {
        try {
            const response = await axios.get(
                `${API_URL}getEventsOnDay?search=${search}&month=${month}&year=${year}&day=${day}`
            );
            setPage(response.data.pages);
            return response.data.events;
        } catch (err) {
            throw err.response ? err.response.data.error : 'Что-то пошло не так';
        }
    };

    const isRegistrationOpen = (dateStart) => {
    const today = new Date();
    const start = new Date(dateStart);
    
    return today < start;
    };

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchEvents();
                setEvents(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [pageNum, search]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='wrapper'>
            <Header />
            <Message text={message} type={messageType} />
            <div className="search_input-even">
                <input
                    type="text"
                    placeholder="Поиск"
                    className='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img src={loopa} alt="" className="loopa" />
            </div>

            <div className='events'>
                {events.map((event) => {

                    return (
                        <div className="event" key={event.id}>

                            <div className="event_top">
                                <div className="date-use-event">
                                    <p className="day_start">
                                        {event.date_start.split('-')[2]}.{event.date_start.split('-')[1]} -
                                        {event.date_end.split('-')[2]}.{event.date_end.split('-')[1]}
                                    </p>
                                </div>

                                <div className="event_title-use">
                                    <p className="event_name">{event.name}</p>
                                </div>

                                <div className="event_city">
                                    {event.organization
                                        ? <p className="event_date">{event.organization.region}</p>
                                        : <p className="event_date">Проводится Онлайн</p>}
                                </div>
                            </div>

                            <div className="event_bottom-useev">

                                <div className="event_type">
                                    <img src={TypeImg} alt="" className="event_type_img" />
                                    <p className="event_type_name">{event.type}</p>
                                </div>

                                <div className="event_age_group-ev">
                                    <img src={user_icon} alt="" className="event_type_img" />
                                    <p className="event_age_group_name">{event.age_group}</p>
                                </div>

                                <div className='button-Sign'>
                                    <div className="buttons-group2">
                                        {isRegistrationOpen(event.date_start) && (
                                            <button
                                                className="event_button-opisani"
                                                onClick={() => {
                                                    if (!localStorage.getItem('token')) {
                                                        navigate('/Login');
                                                        return;
                                                    }

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
                                                        setMessage(
                                                            err.response?.data?.error === 'You already have this event'
                                                                ? 'Вы уже записаны на мероприятие'
                                                                : 'Ошибка при записи'
                                                        );

                                                        setMessageType('error');

                                                        setTimeout(() => {
                                                            setMessage('');
                                                        }, 3000);
                                                    });
                                                }}
                                            >
                                                Записаться
                                            </button>
                                        )}

                                        <button
                                            className="event_button-opisani"
                                            onClick={() => navigate(`/EventDescription/${event.id}`)}
                                        >
                                            Подробнее
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

            

            <div className='pagination'>
                {Array.from({ length: pages + 1 }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        className={page === pageNum + 1 ? 'page active' : 'page'}
                        onClick={() => setPageNum(page - 1)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default UseEvents;