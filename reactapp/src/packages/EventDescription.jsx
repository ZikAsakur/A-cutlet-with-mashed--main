import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { API_URL } from '..';

function EventDescription(){

    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(()=>{
        axios.get(API_URL + 'getEventDescription/' + id, { 
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }).then(res =>{
            setEvent(res.data);
            
        }).catch(err =>{
            console.log(err)
        })

    },[id]);

    if (!event) return <div>Loading...</div>;

    return(
        <div className="wrapper">
        <Header />
            <main>
                <div>
                <h1>{event.name}</h1>
                <p>{event.date_start}</p>
                <p>{event.date_end}</p>
                <p>{event.type}</p>
                <p>{event.age_group}</p>
            </div>
            </main>
        <Footer/>
    </div>
    );
}

export default EventDescription;