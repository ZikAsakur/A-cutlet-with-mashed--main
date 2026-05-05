import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_URL } from '..';
import './OrganizationInfo.css';
import './.css';
import TypeImg from '../static/img/TypeImg.png';
import user_icon from '../static/img/user_icon.png';
import { useNavigate } from 'react-router-dom';
import loopa from '../static/img/loopa.png';

function UseEvents() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNum, setPageNum] =  useState(useRef(0)["current"])
    const [pages, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const formatDate = (date) => {
        const [month, day] = date.split(".");
        return `${day}.${month}`;
    };
    const fetchEvents = async (id) => {
        try {
            const response = await axios.get(`${API_URL}getVerifiedEvents/${id}?search=${search}`);
            setPage(response.data.pages);
            
            return response.data.events;
        } catch (err) {
            throw err.response ? err.response.data.error : 'Что-то пошло не так';
        }
    };

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const events = await fetchEvents(pageNum);
                setEvents(events);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [ pageNum,search]);



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleDescriptionClick = (description) => {
        alert(description);
    };
    console.log(events);
    
    return (
        <div className='wrapper'>
            <Header />
            <h2>Verified Events</h2>
            <div className="search_input">
            <input type="text" placeholder="Поиск"  className='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div><img src={loopa} alt=""  className="loopa"/></div>
            </div>
            <div className='events'>
            {events.map((event) => (
                    <div className="event">
                        <div className="event_top">
                            <div className="date">
                                <p className="day_start">{formatDate{event.date_start}}</p>
                                <p className="day_start">{formatDate{event.date_end}}</p>
                            </div>
                            <div className="event_title">
                                <p className="event_name">{event.name}</p>
                            </div>
                            <div className="event_city">
                                {event.organization ?<p className="event_date">{event.organization.region}</p>: <p className="event_date">Проводиться Онлайн</p>}
                            </div>
                        </div>
                        <div className="event_bottom">
                            <div className="event_type">
                                <img src={TypeImg} alt="" className="event_type_img"/>
                                <p className="event_type_name">{event.type}</p>
                            </div>
                            <div className="event_age_group-ev">
                                <img src={user_icon} alt="" className="event_type_img" />
                                <p className="event_age_group_name">{event.age_group}</p>
                            </div>
                            <div className='button-Sign'>
                            <button className="event_button-opisani" onClick={() => {
                                if (!localStorage.getItem('token')) {
                                    navigate('/Login');
                                    return;
                                }
                                axios.post(API_URL + 'addEventToPerson' , {id: event.id} , {  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res => {
                                    const data = res.data
                                    navigate('/PersonalAccountUser');
                                    console.log(data);
                                }).catch(err => {
                                    navigate('/PersonalAccountUser');
                                })
                            }}
                                >Записаться</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='pagination'>
                {Array.from({ length: pages+1 }, (_, index) => index + 1).map((page) => (
                    <button className={page === pageNum+1 ? 'page active' : 'page'} key={page} onClick={() => {setPageNum(page-1); console.log(page)}}>
                        {page}
                    </button>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default UseEvents;