import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Fade, Button, CircularProgress, makeStyles } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import ChevronLeftSharp from '@material-ui/icons/ChevronLeftSharp';
import ChevronRightSharp from '@material-ui/icons/ChevronRightSharp';

import { SignupForm } from '..';
import { LoginForm } from '..';
import { CustomeModal as Modal } from '..';

import { getUser, loginUser, actions } from '../../redux/reducers/user';

export default function UserAccount(props) {
    const { goToPreviousStep, goToNextStep, classes } = props;
    const user = useSelector(getUser);

    const [createUser, setCreateUser] = useState();
    const [connect, setConnect] = useState();
    const [logingIn, setLogingIn] = useState();

    const toggleCreateUser = () => {
        setCreateUser(!createUser);
    };

    const toggleConnectUser = () => {
        setConnect(!connect);
    };

    const dispatch = useDispatch();
    const afterCreateUser = (password, username) => {
        setLogingIn(true);
        dispatch(loginUser({ username, password })).then(() => {
            dispatch(actions.resetStatus());
            setLogingIn(false);
            setCreateUser(false);
        });
    };

    return (
        <div>
            {user ?
                <div className="f-group compte">
                    <Typography variant="body1" >Le compte qui sera utilisé pour cette réservation est le suivant :</Typography>
                    <div className="account-card">
                        <Person htmlColor="#2340c1" />
                        <Typography>{user.prenom} {user.nom} | {user.tel}</Typography>
                    </div>
                    <Typography variant="caption">
                        Cliquez sur <strong>suivant</strong> Pour aller à la dernière étape de votre réservation.
                    </Typography>
                    <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                        <Button
                            className="btn"
                            variant="text"
                            disableElevation
                            color="primary"
                            onClick={goToPreviousStep}
                        >
                            <ChevronLeftSharp style={{ marginRight: 10 }} />
                            Précédent
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="btn"
                            onClick={goToNextStep}
                            disableElevation
                        >
                            Suivant
                            <ChevronRightSharp />
                        </Button>
                    </div>
                </div> :
                <div className="f-group">
                    <Fade in={!user}>
                        <div style={{ maxWidth: 520, margin: 'auto' }}>
                            <Typography className={classes.blockDescription}>Pour finir votre réservation, connectez-vous à un compte utilisateur ou créez-en un nouveau.</Typography>
                            <div style={{ maxWidth: 300, marginLeft: 'auto', marginRight: 'auto' }}>
                                <Button
                                    variant="outlined"
                                    color="default"
                                    className="btn"
                                    disableElevation
                                    onClick={toggleConnectUser}
                                    fullWidth
                                    style={{
                                        marginTop: 20
                                    }}
                                >
                                    Se connecter à un compte
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="default"
                                    className="btn"
                                    disableElevation
                                    onClick={toggleCreateUser}
                                    fullWidth
                                    style={{
                                        marginTop: 20
                                    }}
                                >
                                    Céer un nouveau compte
                                </Button>
                                <Button
                                    className={`btn`}
                                    style={{ marginTop: 20 }}
                                    size="large"
                                    variant="text"
                                    disableElevation
                                    color="primary"
                                    onClick={goToPreviousStep}
                                    fullWidth
                                >
                                    <ChevronLeftSharp style={{ marginRight: 10 }} />
                                    Précédent
                                </Button>
                            </div>
                        </div>
                    </Fade>
                    {(connect || createUser) &&
                        <Modal contentContainerClassName={classes.connexionContainer} contentContainerStyles={{ padding: 0 }} open={connect || createUser} handleClose={() => { setCreateUser(false); setConnect(false) }}>
                            <div className={classes.connexionForms}>
                                {(connect && !createUser) &&
                                    <Fade in={connect}>
                                        <LoginForm canGoCreateAccount={false} />
                                    </Fade>
                                }
                                {(!connect && createUser) &&
                                    <Fade in={connect}>
                                        {logingIn ?
                                            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 434 }}>
                                                <Typography variant="body2">En cours de connexion...</Typography>
                                                <CircularProgress size={20} color="primary" />
                                            </div> :
                                            <SignupForm successCallback={afterCreateUser} />
                                        }
                                    </Fade>
                                }
                            </div>
                        </Modal>
                    }
                </div>
            }
        </div>
    )
}

UserAccount.propTypes = {
    goToPreviousStep: PropTypes.func.isRequired,
    goToNextStep: PropTypes.func.isRequired,
    classes: PropTypes.any.isRequired
}