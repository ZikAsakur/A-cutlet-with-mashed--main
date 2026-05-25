import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { API_URL, API_MEDIA } from '..';
import './EventDescription.css';

function EventDescription() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    const formatDate = (dateStr) => {
    if (!dateStr) return '';

    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
    };

    useEffect(() => {
        axios.get(API_URL + 'getEventDescription/' + id, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(res => {
            setEvent(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [id]);

    if (!event) return <div>Loading...</div>;

    return (
        <div className="wrapper">
        <Header />

        <div className="event-page">

            <div className="event-left">
                <div
                    className="image-event"
                    style={{
                        backgroundImage: event.image
                            ? `url(${API_MEDIA + event.image})`
                            : 'none'
                    }}
                />
            </div>

            <div className="event-right">

                <div className="event-status">
                    Регистрация открыта
                </div>

                <h1 className="event-title">{event.name}</h1>

                <div className="event-meta">
                    <span>{event.type}</span>
                    <span>{event.age_group}</span>
                </div>

                <div className="event-block">
                    <h3>📌 О мероприятии</h3>
                    <p>{event.description}</p>
                </div>

                <div className="event-block">
                    <h3>📅 Даты проведения</h3>
                    <p>
                        {formatDate(event.date_start)} — {formatDate(event.date_end)}
                    </p>
                </div>

                {event.source && (
                    <div className="event-block">
                        <h3>🔗 Источник</h3>
                        <p>{event.source}</p>
                    </div>
                )}

                {event.link && (
                    <a
                        href={event.link}
                        target="_blank"
                        rel="noreferrer"
                        className="event-button"
                    >
                        Перейти на сайт
                    </a>
                )}

            </div>
        </div>

        <Footer />
    </div>
    );
}

export default EventDescription;