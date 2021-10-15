import React from 'react';
import clsx from 'clsx';
import './style.css';
import { makeStyles, Typography, Avatar, useMediaQuery } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import {
    EventNote,
    FormatListBulleted,
    HomeOutlined
} from '@material-ui/icons';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../../redux/reducers/user';

export default function SideBar({ open, handleClose }) {
    const user = useSelector(getUser);

    const { url } = useRouteMatch();

    const matches = useMediaQuery("(max-width: 959.95px)");

    const handleMenuClick = () => {
        if (matches) {
            handleClose();
        }
    };

    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            className={clsx('sidebar', classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className="toolbar">
                <div className={clsx("user")}>
                    <Avatar aria-label={user.nom} style={{ width: 50, height: 50, fontSize: 16, backgroundColor: "#ff7a00" }} title={`${user.nom} ${user.postnom}`}>
                        {user ? user.nom[0] : ""}
                    </Avatar>
                    <Typography style={{ fontWeight: 'inherit' }} color="inherit" variant="body2">{user.prenom} {user.nom}</Typography>
                </div>
                <div className="sidebar-menu">
                    <NavLink exact to={`${url}`} onClick={handleMenuClick} activeClassName="sidebar-menu-item-active" className={clsx("sidebar-menu-item")}>
                        <HomeOutlined />
                        <Typography style={{ fontWeight: 'inherit' }} className={clsx({ [classes.hide]: !open })}>Home</Typography>
                    </NavLink>
                    <NavLink to={`${url}/reservations`} onClick={handleMenuClick} activeClassName="sidebar-menu-item-active" className={clsx("sidebar-menu-item")}>
                        <EventNote />
                        <Typography style={{ fontWeight: 'inherit' }} className={clsx({ [classes.hide]: !open })}>Reservations</Typography>
                    </NavLink>
                    <NavLink to={`${url}/devis`} onClick={handleMenuClick} activeClassName="sidebar-menu-item-active" className={clsx("sidebar-menu-item")}>
                        <FormatListBulleted />
                        <Typography style={{ fontWeight: 'inherit' }} className={clsx({ [classes.hide]: !open })}>Devis</Typography>
                    </NavLink>
                </div>
            </div>
        </Drawer>
    )
}

const useStyles = makeStyles((theme) => ({
    hide: {
        visibility: 'hidden',
        opacity: 0
    },
    drawer: {
        width: 200,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            position: 'fixed',
            zIndex: 200,
            height: '100%'
        }
    },
    drawerOpen: {
        width: 200,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
    },
    menuButton: {
        padding: '12px 14px!important',
        borderRadius: '0!important',
        justifyContent: 'flex-start'
    },
    zoroPaddingHorizontal: {
        paddingRight: '0px!important',
        paddingLeft: '0px!important'
    },
    paddingHorizontal3: {
        paddingRight: '3px!important',
        paddingLeft: '3px!important'
    },
    centerContent: {
        justifyContent: 'center',
    }
}));

