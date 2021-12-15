import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Typography, Button, makeStyles, fade, LinearProgress, Radio, Fade } from '@material-ui/core';
import { cancelationReasons } from '../../customeFunctionalities/data';
import TextInput from '../Inputs/TextInput';

import axios from '../../config/axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: 0,
        height: 0,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        position: 'fixed',
        opacity: 0,
        visibility: 'hidden',
        display: 'flex',
        padding: 40,
        transition: 'width 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    openRoot: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 1,
        visibility: 'visible',
        width: '100vw',
        height: '100vh',
        zIndex: 10000
    },
    contentContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        maxWidth: 650,
        width: 0,
        height: 0,
        padding: '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 3,
        boxShadow: 'rgb(1 4 9 / 39%) 0px 2px 10px 0px',
        transition: 'height 1000ms cubic-bezier(0.4, 0, 0.2, 1) 1000ms, opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    contentOpen: {
        height: 'fit-content',
        width: 400,
        right: 20,
        bottom: 20,
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            bottom: '50%',
            right: '50%',
            transform: "translate(50%, 50%)",
        }
    },
    content: {
        "& > p": {
            marginBottom: 10
        }
    },
    reasons: {
        margin: '0 0 20px 0'
    },
    actions: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        paddingTop: '10px',
        alignItems: 'center',
        marginTop: 10,
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
        }
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2
    }
}));

const CancelationReason = ({ open, onClose, reservationId }) => {
    const [cancelationReason, setCancelationReason] = React.useState('');
    const [textInput, setTextInput] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    const toggleTextInput = () => {
        setTextInput(true);
    };

    const handleChangeReason = (e) => {
        setCancelationReason(e.target.value);
    };

    const canceled = () => {
        setTimeout(() => {
            onClose();
        }, 500);
        setTimeout(() => {
            history.goBack();
        }, 600);
    };

    const submitReson = (e, reason) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`/api/reservation/${reservationId}/annuler/raison`, { motif: reason || cancelationReason })
            .then(res => {
                const d = res.data;
                if (!d.code) {
                    canceled();
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => { setLoading(false); });

    };

    const classes = useStyles();
    return (
        <div className={clsx(classes.root, { [classes.openRoot]: open })}>
            <form className={clsx(classes.contentContainer, { [classes.contentOpen]: open })}>
                <div className={classes.content}>
                    <Typography style={{ fontWeight: 500 }}>Pouvez-vous dire pour quoi vous avez annulé cette reservation ?</Typography>
                    <div className={classes.reasons}>
                        {cancelationReasons.map((reason, index) => (
                            <label htmlFor={reason} key={index} className="radio">
                                <Radio disabled={loading} type="radio" color="primary" size="small" checked={cancelationReason === reason} onChange={handleChangeReason} id={reason} value={reason} />
                                <Typography variant="body1">{reason}</Typography>
                            </label>
                        ))}
                    </div>
                    {!textInput ?
                        <Button
                            className="btn"
                            variant="text"
                            color="primary"
                            type="submit"
                            onClick={toggleTextInput}
                            disabled={loading}
                            disableElevation
                            style={{ marginBottom: 20 }}
                        >
                            Une autre raison
                        </Button> :
                        <Fade in={textInput}>
                            <TextInput
                                name="reason"
                                id="reason"
                                type="text"
                                fullWidth
                                multiline
                                disabled={loading}
                                placeholder="Votre raison ici"
                                onChange={e => setCancelationReason(e.target.value)}
                                value={cancelationReason}
                                style={{ marginBottom: 20 }}
                                rows={3}
                                rowsMax={4}
                            />
                        </Fade>
                    }
                </div>
                <div className={classes.actions}>
                    {loading &&
                        <div className={classes.loading}>
                            <LinearProgress />
                        </div>
                    }
                    <Button
                        className="btn"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={e => submitReson(e, null)}
                        disabled={cancelationReason === "" || loading}
                        disableElevation
                    >
                        Enregistrer
                    </Button>
                    <Button
                        className="btn"
                        variant="outlined"
                        color="default"
                        onClick={e => submitReson(e, "Aucune raison")}
                        disabled={loading}
                        disableElevation
                    >
                        Aucune raison
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default CancelationReason;