import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import { SearchInput } from '../../components';

export default function SectionHeader(props) {
    const { title, searchValue, onSearchValueChange } = props;
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography style={{ fontSize: 15 }}>{title}</Typography>
            <SearchInput value={searchValue} onChange={onSearchValueChange} />
        </div>
    )
}

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    searchValue: PropTypes.string.isRequired,
    onSearchValueChange: PropTypes.func.isRequired
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    }
});
