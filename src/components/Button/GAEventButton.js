import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import ReactGA from 'react-ga';

const GAEventButton = ({children, onClick, category, action, label, ...other}) => {
    const handleOnClick = () => {
        if (typeof onClick === 'function') onClick();
        ReactGA.event({
            category: category,
            action: action,
            label: label,
        });
    }

    return (
        <Button
            {...other}
            onClick={handleOnClick}
        >
            {children}
        </Button>
    )
}

GAEventButton.propTypes = {
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func,
    label: PropTypes.string,
    action: PropTypes.string,
}


export default GAEventButton;