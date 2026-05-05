
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './packages/Home.js';
import UseEvents from './packages/UseEvents';
import Events from './packages/Events';
import Login from './packages/Login';
import Register from './packages/Register';
import PersonalAccountUser from './packages/PersonalAccountUser.jsx';
import { BrowserRouter, Route, Routes  } from'react-router-dom';
import ForgotPassword from './packages/forgotPassword.jsx';
import ResetPassword from './packages/resetPassword.jsx';
import OrganizationInfo from './packages/OrganizationInfo.jsx';
import Analytics from './packages/Analytics.js';

//export const API_URL = "https://shadow7x.pythonanywhere.com/api/hacaton/";
//export const API_MEDIA = "https://shadow7x.pythonanywhere.com";
 export const API_URL = "http://localhost:8000/api/hacaton/";  
 export const API_MEDIA = "http://localhost:8000";


const basename = '/hacaton';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/event" element={<Events />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path = "/PersonalAccountUser" element={<PersonalAccountUser />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path = "/resetPassword/:email" element={<ResetPassword />} />
          <Route path = "/Event/:days/:year" element={<Events/>} />
          <Route path = "/OrganizationInfo/:id" element={<OrganizationInfo/>} />
          <Route path="/event/:year/:month/:day" element={<UseEvents />} />
          <Route path="/Analytics" element={<Analytics />} />
        </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);


