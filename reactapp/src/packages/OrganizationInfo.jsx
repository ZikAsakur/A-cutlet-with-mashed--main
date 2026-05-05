
import { useEffect , useState} from "react";
import { Link } from 'react-router-dom';
import event from '../static/img/event.png';
import region from '../static/img/region.png';
import axios from "axios";
import { API_URL } from '../index';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './OrganizationInfo.css';
import TypeImg from '../static/img/TypeImg.png';
import user_icon from '../static/img/user_icon.png';
import MapOrganiz from "../components/MapOrganiz";
import { useParams } from 'react-router-dom';

function OrganizationInfo() {
    const navigate = useNavigate();
    
    const [organization , setOrganization] = useState([]);
    const [events , setEvents] = useState([]);
    const {id}  = useParams()
    console.log(id);

    const[comments , setComments] = useState([]);
    const[currentCommentIndex, setCurrentCommentIndex] = useState(0)
    
    useEffect(() => {
        
        axios.get(API_URL + 'getOrganizationInfo/'+id, {  headers: {'Authorization': 'Token ' + localStorage.getItem('token')}}).then(res =>  {
            const data = res.data
            setOrganization(data.organization);
            setEvents(data.events);
            setComments(data.comments)
            console.log(data);
            
            
        }).catch(err => {
            console.log(err)
        })
    },[])
    console.log(comments);
    console.log(events);
    console.log(organization)
    useEffect(() =>{
        const interval = setInterval(() => {
            setCurrentCommentIndex((prevIndex)=> (prevIndex + 1) % comments.length);
        },6500);
        return() => clearInterval(interval);
    },[comments]);

    return (
        <div className="wrapper">
        <Header />
        <div className="main">
            <h1 className="title">Представитель региона</h1>
            <div className="main_info">
                {organization.region && <MapOrganiz regionName={organization.region}/>}
                <div className="info_org">
                    <div className="stat_info">
                        <p className="name">Руководитель:</p>
                        <div className="cart_stat">
                            <p className="p_info">{organization.fio}</p>
                        </div>
                    </div>
                    <div className="stat_info">
                        <p className="name">Контакты:</p>
                        <div className="cart_stat">
                            <p className="p_info">{organization.email}</p>
                        </div>
                    </div>
                    <div className="stat_info">
                        <p className="name">Регион:</p>
                        <div className="cart_stat">
                            <p className="p_info">{organization.region}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="OrganizationComment">
                    <div className="comment-marquee">
                        {comments.map((comment,index) => (
                            <p key={index} className={index === currentCommentIndex ? 'active': ''}>{comment.comment}</p>
                        ))}
                    </div>
                </div>
            <h1 className="title title_event">События</h1>
            <div className="events">
                {events.map((event) => (
                    <div className="event">
                        <div className="event_top">
                            <div className="date">
                                <p className="day_start">{event.date_start.split('-')[1]}.{event.date_start.split('-')[2]} - {event.date_end.split('-')[1]}.{event.date_end.split('-')[2]}</p>
                                
                            </div>
                            <div className="event_title">
                                <p className="event_name">{event.name}</p>
                            </div>
                            <div className="event_city">
                                <p className="event_date">{organization.region}</p>
                            </div>
                        </div>
                        <div className="event_bottom">
                            <div className="event_type">
                                <img src={TypeImg} alt="" className="event_type_img"/>
                                <p className="event_type_name">{event.type}</p>
                            </div>
                            <div className="event_age_group-og">
                                <img src={user_icon} alt="" className="event_type_img" />
                                <p className="event_age_group_name">{event.age_group}</p>
                            </div>
                            <div className="button-Sign-ovr">
                            <button className="event_button" onClick={() => {
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
        </div>
        <Footer />
        </div>

    )
}

export default OrganizationInfo