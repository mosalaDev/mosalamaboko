import React from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.png';
import { Avatar, Typography } from '@material-ui/core';
import { HomeOutlined, HistoryOutlined, NotificationImportantOutlined, PersonOutline } from '@material-ui/icons';

export default function AdminTopbar() {
    const { url } = useRouteMatch();
    return (
        <div className="topbar">
            <div className="inner-wrapper">
                <div className='titlebar'>
                    <div className="logo-container">
                        <img src={logo} alt="logo" />
                        <Typography color="inherit" style={{ fontSize: 12, fontWeight: 600, marginLeft: 5, textTransform: 'uppercase' }}>Administration</Typography>
                    </div>
                    <div>
                        <Link to="/">
                            <Typography color="inherit" style={{ fontWeight: 600, fontSize: 12 }}>Aller au site web</Typography>
                        </Link>
                        <div>
                            <Avatar>S</Avatar>
                        </div>
                    </div>
                </div>
            </div>
            <div className='menubar'>
                <menu>
                    <NavLink to={`${url}`} className="menu-item" exact activeClassName="active">
                        {/* <HomeOutlined color="inherit" fontSize="large" /> */}
                        <Typography variant="caption" color="inherit">Tableau de bord</Typography>
                    </NavLink>
                    <NavLink to={`${url}/reservations`} className="menu-item" activeClassName="active">
                        {/* <HistoryOutlined fontSize="large" color="inherit" /> */}
                        <Typography variant="caption" color="inherit">Reservations</Typography>
                    </NavLink>
                    <NavLink to={`${url}/notifications`} className="menu-item" activeClassName="active">
                        {/* <NotificationImportantOutlined fontSize="large" color="inherit" /> */}
                        <Typography variant="caption" color="inherit">Notifications</Typography>
                    </NavLink>
                    <NavLink to={`${url}/techniciens`} className="menu-item" activeClassName="active">
                        {/* <PersonOutline fontSize="large" color="inherit" /> */}
                        <Typography variant="caption" color="inherit">Techniciens</Typography>
                    </NavLink>
                </menu>
            </div>
        </div>
    )
}
