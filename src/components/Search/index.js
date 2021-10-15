import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

export default function Search(props) {
    const { value, onChange } = props;

    const classes = useStyles();
    return (
        <form className={classes.container}>
            <input
                type="search"
                value={value}
                onChange={onChange}
                className={classes.input}
            />
            <span className={classes.icon}>
                <SearchOutlined fontSize="small" htmlColor="#444" />
            </span>
        </form>
    )
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};


const useStyles = makeStyles({
    container: {
        border: '1px solid #eaeaea',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        flexGrow: 1,
        border: 'none',
        padding: '7px 5px',
        outline: 'none',
        color: '#444'
    },
    icon: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderLeft: '1px solid #eaeaea',
    }
});