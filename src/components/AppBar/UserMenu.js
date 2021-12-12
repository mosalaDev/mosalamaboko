import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import { ArrowDropDown } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { logoutUser, isLogingOut } from '../../redux/reducers/user';
import { CircularProgress, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 20
    },
    content: {
        backgroundColor: '#fff',
        boxShadow: 'rgb(1 4 9 / 48%) 0px 8px 24px 0px',
        border: '1px solid rgba(0, 0, 0, 0.58)',
        borderRadius: 8,
        "& > div": {
            color: '#444',
            "&:not(:last-child)": {
                borderBottom: '1px solid #eaeaea',
            },
            "& p": {
                fontSize: 15,
            }
        },
        "& > div a": {
            display: 'block',
            padding: theme.spacing(1.4, 2),
            transition: 'background .2s',
            "&:not(:last-child)": {
                borderBottom: '1px solid #eaeaea',
            },
            "&:hover": {
                backgroundColor: '#5b9bd521'
            }
        },
        "& > div:first-child p": {
            padding: theme.spacing(1.4, 2),
            display: 'flex',
            flexDirection: 'column',
            "& > span:last-child": {
                fontWeight: 600,
                color: '#808080',
            }
        },
        "& > div:last-child": {
            padding: theme.spacing(2, 2),
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%'
        }
    },
}));

export default function UserMenu({ user, shadow }) {
    const loading = useSelector(isLogingOut);

    const matches = useMediaQuery('(max-width:600px)');

    const dispatch = useDispatch();
    const handleDeconnect = () => {
        dispatch(logoutUser());
    };
    const classes = useStyles();
    return (
        <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
                <div>
                    <Button
                        className="btn"
                        {...bindToggle(popupState)}
                        disableElevation
                        style={{
                            border: `1px solid ${shadow ? "#eaeaea" : '#fff'}`,
                            color: shadow ? "#777" : '#fff',
                        }}
                    >
                        {user ? user.prenom : ""}
                        <ArrowDropDown />
                    </Button>
                    <Popper {...bindPopper(popupState)} transition style={{ zIndex: 20, padding: '10px 0' }} className="popper" placement="bottom-end">
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <div className={clsx(classes.content, 'popper-content')}>
                                    <div>
                                        <Typography><span>Connecté{user.sexe !== "M" ? "e" : ""} en tant que</span><span>{user.prenom} {user.nom}</span></Typography>
                                    </div>
                                    <div>
                                        <Link to={`/client/${user.username}`}>
                                            <Typography>Mon profile</Typography>
                                        </Link>
                                        <Link to={`/client/${user.username}/reservations`}>
                                            <Typography>Mes reservations</Typography>
                                        </Link>
                                        <Link to={`/client/${user.username}/devis`}>
                                            <Typography>Mes devis</Typography>
                                        </Link>
                                    </div>
                                    <div>
                                        <Button
                                            variant="outlined"
                                            color="default"
                                            className="btn"
                                            size="small"
                                            fullWidth
                                            onClick={handleDeconnect}
                                        >
                                            Deconnecter
                                            {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                                        </Button>
                                    </div>
                                </div>
                            </Fade>
                        )}
                    </Popper>
                </div>
            )}
        </PopupState>
    );
}