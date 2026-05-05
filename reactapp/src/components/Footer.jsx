import './footer.css';
import React, { Component } from 'react'
import VK from "../static/img/VK.png"

function Footer() {
    return (
    <footer>
        <p className="year-footer">@2024 Федерация спортивного программирования России</p>
        <div className="info-mess">
            <div className="contact-info">
                <p className="phone">+7 (499) 678-03-05</p>
            </div>
        <div className="mes">
            <a href="https://vk.com/russiafsp" className="VK">
                <img src={VK} className="VK" alt=""/>
            </a>
        </div>
        </div>
    </footer>
    );
}

export default Footer