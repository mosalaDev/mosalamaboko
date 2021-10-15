import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Select, MenuItem } from '@material-ui/core';
import { ChevronLeftSharp, ChevronRightSharp } from '@material-ui/icons';

import { FormBlockContainer } from '..';
import TextInput from '../Inputs/TextInput';
import { DatePicker } from '../Inputs/DateTimePicker';

const AddressDateAndTime = (props) => {
    const { handleGoToBackStep, handleGoToNextStep, badge } = props;
    return (
        <FormBlockContainer
            badge={badge}
            title="Lieu, date et heure de travail"
        >
            <>
                <TextInput
                    label="Lieu"
                    fullWidth
                    placeholder="L'adresse complète du lieu d'entretien"
                    variant="outlined"
                />
                <div className="date-time">
                    <div className="picker">
                        <Typography variant="body2" className="label">Date</Typography>
                        <DatePicker
                            selectedDate={Date.now()}
                            setSelectedDate={() => { }}
                        />
                    </div>
                    <div className="picker">
                        <Typography variant="body2" className="label">Heure</Typography>
                        <div className>
                            <Select
                                label="Heure"
                                fullWidth
                                value={8}
                            >
                                {([8, 9].map((e, i) => {
                                    console.log(i + 8);
                                    return (
                                        <MenuItem key={i} value={i + 8}>
                                            {(i + 8).toString()}
                                        </MenuItem>
                                    )
                                }))}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <Button
                        className="btn"
                        size="large"
                        variant="contained"
                        disableElevation
                        color="secondary"
                        onClick={() => handleGoToBackStep(0)}
                    >
                        <ChevronLeftSharp />
                        Précendent
                    </Button>
                    <Button
                        className="btn"
                        size="large"
                        variant="contained"
                        disableElevation
                        color="primary"
                        onClick={() => handleGoToNextStep(2)}
                    >
                        Suivant
                        <ChevronRightSharp />
                    </Button>
                </div>
            </>
        </FormBlockContainer>
    )
}

AddressDateAndTime.propTypes = {
    badge: PropTypes.string,
    handleGoToBackStep: PropTypes.func,
    handleGoToNextStep: PropTypes.func,
}

export default AddressDateAndTime;
