import React from 'react';
import PropTypes from 'prop-types';
import './formBlockContainer.css';
import { Typography } from '@material-ui/core';

const FormBlockContainer = (props) => {
    const { children, title, badge, style } = props;
    return (
        <div className="form-block" style={style}>
            <div className="block-header">
                <span className="block-badge">
                    {badge}
                </span>
                <Typography variant="body1" className="block-title">{title}</Typography>
            </div>
            <div className="block-body">
                {children}
            </div>
        </div>
    )
}

FormBlockContainer.propTypes = {
    children: PropTypes.element,
    badge: PropTypes.string,
    title: PropTypes.string,
    style: PropTypes.object,
}

export default FormBlockContainer;
