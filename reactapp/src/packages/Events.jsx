import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_URL } from '..';
import { use } from 'react';
import './OrganizationInfo.css';
import './Events.css';
import TypeImg from '../static/img/TypeImg.png';
import user_icon from '../static/img/user_icon.png';
import { useNavigate } from 'react-router-dom';
import loopa from '../static/img/loopa.png';


function Events() {
    const [counts, setCounts] = useState({});
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNum, setPageNum] =  useState(useRef(0)["current"])
    const [month, setMonth] = useState(new Date().getMonth()+1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [days , setDay] = useState(new Date(year, month,0).getDate());
    const [pages, setPage] = useState(0);
    const [search, setSearch] = useState('');
    let count = 0
    console.log(days)
    const moths = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_URL}getVerifiedEvents?search=${search}&month=${month}&year=${year}`);
            setPage(response.data.pages);
            setDay(new Date(year, month,0).getDate());
            return response.data.events;
        } catch (err) {
            throw err.response ? err.response.data.error : 'Что-то пошло не так';
        }
    };

    
    useEffect(() => {
        
        const loadEvents = async () => {
            try {
                const events = await fetchEvents();
                setEvents(events);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }; 
        loadEvents();
    }, [ pageNum,search,month,year]);



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const handleDescriptionClick = (description) => {
        alert(description);
    };
    console.log(events);
    
    return (
        <div className='wrapper'>
            <Header />
            <h2></h2>
            <div className="search_input-use">
            <input type="text" placeholder="Поиск"  className='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div><img src={loopa} alt=""  className="loopa"/></div>
            
            </div>
            <div className="date">
                <button className='date_button_up' onClick={() => {
                    if (month===1){
                        setMonth(12)
                        setYear(year-1)
                    }
                    else{setMonth(month-1)}
                    

                }}>←</button>
                <p className="month">{moths[month-1]}</p>
                <p className="year">{year}</p>
                <button className='date_button_down' onClick={() => {
                    if (month===12){
                        setMonth(1)
                        setYear(year+1)
                    }
                    else setMonth(month+1)
                    
                    }}>→</button>
            </div>
            <div className='events_Calendar'>
            
                <>
                {Array(days).fill().map((_, index) => index + 1).map((day) => (
                    <div className='card_day'>
                        <p className="num_day">{day}</p>
                        {events.map((event) => {
                                <>
                                
                                    {day === Number(event.date_start.split('-')[2]) ?
                                    
                                        count++
                                    
                                    :
                                    <></>
                                    }
                                </>
                        })}
                        
                        <div className="many_event">
                                <p className="p_many_event">Количество мероприятий в этот день: <span className="days_count"> {count}</span></p>
                        </div>
                        {count !==0 ? <a onClick={() => navigate(`/event/${year}/${month}/${day}`)}><button className="button_day">Показать</button></a> : <></>}
                        <p className="hiden">{count = 0}</p>
                        
                    </div>
                ))}
                </>

            </div>
            <Footer />
        </div>
        
    );
}

export default Events;