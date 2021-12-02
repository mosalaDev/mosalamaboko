import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.common.white,
        borderRadius: 7,
        boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 3),
        maxHeight: '100vh',
        overflowY: 'auto',
    },
}));

const CustomeModal = (props) => {
    const { children, open, handleClose, contentContainerStyles, contentContainerClassName } = props;
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: {
                        backgroundColor: '#00000096'
                    }
                }}
            >
                <Fade in={open}>
                    <div className={clsx(classes.paper, contentContainerClassName)} style={contentContainerStyles}>
                        {children}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


CustomeModal.propTypes = {
    children: PropTypes.element,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    contentContainerStyles: PropTypes.object,
    contentContainerClassName: PropTypes.string,
}

export default CustomeModal;