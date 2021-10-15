import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Button, makeStyles, fade, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: 0,
        height: 0,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        position: 'fixed',
        opacity: 0,
        visibility: 'hidden',
        display: 'flex',
        paddingTop: 40,
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
        }
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
        backgroundColor: '#fff',
        maxWidth: 500,
        width: 'fit-content',
        height: 'fit-content',
        padding: '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 3,
        boxShadow: 'rgb(1 4 9 / 39%) 0px 2px 10px 0px',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        }
    },
    content: {
        textAlign: 'center',
        "& > p": {
            marginBottom: 10
        }
    },
    actions: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
        }
    }
}));

const ConfirmationMessage = (props) => {
    const { messages, message, onCancel, onConfirm, confirmText, cancelText, open, confirmationState } = props;

    const classes = useStyles();
    return (
        <div className={clsx(classes.root, { [classes.openRoot]: open })}>
            <div className={classes.contentContainer}>
                <div className={classes.content}>
                    {messages ?
                        messages.map((msg, index) => (
                            <Typography key={index}>{msg}</Typography>
                        )) :
                        message &&
                        <Typography>{message}</Typography>
                    }
                </div>
                <div className={classes.actions}>
                    <Button
                        className="btn"
                        variant="contained"
                        color="primary"
                        onClick={onConfirm}
                        disableElevation
                    >
                        {confirmText || 'Oui'}
                        {confirmationState && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                    </Button>
                    <Button
                        className="btn"
                        variant="outlined"
                        color="default"
                        onClick={onCancel}
                        disableElevation
                    >
                        {cancelText || 'Non'}
                    </Button>
                </div>
            </div>
        </div>
    )
};


ConfirmationMessage.propTypes = {
    open: PropTypes.bool.isRequired,
    messages: PropTypes.arrayOf(PropTypes.string),
    message: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    confirmationState: PropTypes.bool,
}

export default ConfirmationMessage;