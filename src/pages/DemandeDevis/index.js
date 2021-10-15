import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './demandeDevis.css';
import { Typography, Button, TextField, ButtonGroup, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { ChevronRightSharp, ChevronLeftSharp, CancelOutlined, SendOutlined } from '@material-ui/icons';
import { departements } from '../../customeFunctionalities/data';
import drc from '../../assets/drc.png';

import { FormBlockContainer, CustomeModal } from '../../components';
import Select from '../../components/Inputs/Select';
import TextInput from '../../components/Inputs/TextInput';
import { DatePicker } from '../../components/Inputs/DateTimePicker';

export default function DemandeDevis() {
    const [step, setStep] = useState(0);
    const history = useHistory();
    const [more, setMore] = useState(false);
    const [hour, setHour] = useState('8');
    const [min, setMin] = useState('00');
    const [service, setService] = useState(departements[0].name);
    const [works, setWorks] = useState([]);
    const [selectedWorks, setSelectedWorks] = useState([]);

    const goToNextStep = () => {
        setStep(step + 1);
    };

    const goToPreviousStep = () => {
        setStep(step - 1);
    };

    const handleChangeService = (e) => {
        setService(e.target.value);
    };

    const handleChangeWork = (e) => {
        let workNames = selectedWorks;
        const chBx = e.target;

        if (chBx.checked) {
            if (!workNames.some(w => w === chBx.value)) {
                workNames.push(chBx.value);
            }
        } else {
            workNames = workNames.filter(w => w !== chBx.value);
        }

        setSelectedWorks(workNames);
    };

    const handleGoToMore = () => {
        setMore(true);
    };

    const handleSendConsultRequest = () => {
        setMore(false);
    };

    useEffect(() => {
        const serv = departements.find(serv => serv.name === service);
        if (serv) {
            setWorks(serv.services);
        }
    }, [service]);

    return (
        <div className="content devis">
            <div className="form-container">
                <section className="form">
                    {step === 0 &&
                        <FormBlockContainer
                            badge="1"
                            title="Service et panne"
                            style={{ justifyContent: 'center' }}
                        >
                            <>
                                <Select
                                    label="Selectionnez un service"
                                    id="services"
                                    fullWidth
                                    value={service}
                                    options={departements}
                                    onChange={handleChangeService}
                                />
                                <div className="form-actions">
                                    <Button
                                        className="btn"
                                        size="large"
                                        variant="contained"
                                        disableElevation
                                        fullWidth
                                        color="primary"
                                        onClick={goToNextStep}
                                    >
                                        Suivant
                                        <ChevronRightSharp />
                                    </Button>
                                </div>
                            </>
                        </FormBlockContainer>
                    }
                    {step === 1 &&
                        <FormBlockContainer
                            badge="2"
                            title="Détails du travail"
                            style={{ justifyContent: 'center' }}
                        >
                            <>
                                <div className="more-details">
                                    <div>
                                        {!more && <Typography variant="body2" className="label">Avez-vous plus de reseignement concernant le travail à faire ?</Typography>}
                                        <ButtonGroup className="btn-group">
                                            {!more && <Button
                                                className="btn"
                                                size="medium"
                                                variant="contained"
                                                disableElevation
                                                color="primary"
                                                onClick={handleGoToMore}
                                            >
                                                Oui
                                            </Button>
                                            }
                                            <Button
                                                className="btn"
                                                size="medium"
                                                variant="outlined"
                                                disableElevation
                                                color="primary"
                                                onClick={handleSendConsultRequest}
                                            >
                                                Demandez une consultation
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    {more &&
                                        <CustomeModal
                                            open={more}
                                            handleClose={() => setMore(false)}
                                        >
                                            <div className="modal-content">
                                                <Typography variant="h6" className="modal-content-title">Description des travaux</Typography>
                                                <div className="modal-content-body">
                                                    <Typography variant="body1" style={{ fontWeight: 700, color: '#444', marginBottom: 10 }}>Type de travaux</Typography>
                                                    <FormGroup>
                                                        {works.map((panne, index) => (
                                                            <FormControlLabel
                                                                className="m-checkbox"
                                                                key={index}
                                                                control={
                                                                    <Checkbox
                                                                        size="small"
                                                                        value={panne.name}
                                                                        onChange={handleChangeWork}
                                                                        name={panne.name}
                                                                        color="secondary"
                                                                    />
                                                                }
                                                                label={panne.name}
                                                            />
                                                        ))}
                                                        <FormControlLabel
                                                            className="m-checkbox"
                                                            control={
                                                                <Checkbox
                                                                    size="small"
                                                                    value="other"
                                                                    onChange={handleChangeWork}
                                                                    name="other"
                                                                    color="secondary"
                                                                />
                                                            }
                                                            label="Autres"
                                                        />
                                                    </FormGroup>
                                                    <div style={{ marginTop: 20 }}>
                                                        <Typography variant="body1" style={{ fontWeight: 700, color: '#444', marginBottom: 10 }}>Plus de détails sur la(les) panne(es)</Typography>
                                                        <TextField
                                                            placeholder="Votre text ici"
                                                            multiline
                                                            rowsMax={5}
                                                            fullWidth
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-actions" style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
                                                    <Button
                                                        className="btn"
                                                        size="small"
                                                        variant="outlined"
                                                        disableElevation
                                                        color="secondary"
                                                        onClick={() => setMore(false)}
                                                        style={{ display: 'flex' }}
                                                    >
                                                        Annuler
                                                    </Button>
                                                    <Button
                                                        className="btn"
                                                        size="small"
                                                        variant="contained"
                                                        disableElevation
                                                        color="primary"
                                                        onClick={goToNextStep}
                                                        style={{ display: 'flex' }}
                                                    >
                                                        Ok
                                                        <ChevronRightSharp />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CustomeModal>
                                    }
                                </div>
                                <div className="form-actions" style={{ justifyContent: 'center' }}>
                                    <Button
                                        className="btn"
                                        size="large"
                                        variant="contained"
                                        disableElevation
                                        color="secondary"
                                        onClick={goToPreviousStep}
                                    >
                                        <ChevronLeftSharp />
                                        Précendent
                                    </Button>
                                </div>
                            </>
                        </FormBlockContainer>
                    }
                    {step === 2 &&
                        <FormBlockContainer
                            badge="3"
                            title="Lieu, date et heure de travail"
                            style={{ justifyContent: 'center' }}
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
                                        <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Date</Typography>
                                        <DatePicker
                                            selectedDate={Date.now()}
                                            setSelectedDate={() => { }}
                                        />
                                    </div>
                                    <div className="picker">
                                        <div className="time-picker">
                                            <div>
                                                <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Heure</Typography>
                                                <Select
                                                    fullWidth={true}
                                                    value={hour}
                                                    onChange={(e) => setHour(e.target.value)}
                                                    options={(new Array(9)).fill(0).map((e, i) => "" + (i + 8))}
                                                />
                                            </div>
                                            <div>
                                                <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Minutes</Typography>
                                                <Select
                                                    fullWidth={true}
                                                    value={min}
                                                    onChange={(e) => setMin(e.target.value)}
                                                    options={(new Array(60)).fill(0).map((e, i) => {
                                                        if (i < 10) {
                                                            return "0" + i
                                                        }

                                                        return i
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                    <Button
                                        className="btn"
                                        size="large"
                                        variant="contained"
                                        disableElevation
                                        color="secondary"
                                        onClick={goToPreviousStep}
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
                                        onClick={goToNextStep}
                                    >
                                        Suivant
                                        <ChevronRightSharp />
                                    </Button>
                                </div>
                            </>
                        </FormBlockContainer>
                    }
                    {step === 3 &&
                        <FormBlockContainer
                            badge="4"
                            title="Comment allons-nous vous contacter ?"
                            style={{ justifyContent: 'center' }}
                        >
                            <>
                                <div className="contacts">
                                    <div className="contact-header">
                                        <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Numéro de téléphone</Typography>
                                        <img src={drc} alt="drc flag" className="flag" />
                                    </div>
                                    <div className="input-group tel">
                                        <TextField
                                            style={{ width: 90 }}
                                            datatype="numeric"
                                            defaultValue="+243"
                                            disabled
                                            placeholder="+243"
                                            variant="outlined"
                                            inputProps={{
                                                style: {
                                                    color: '#555'
                                                }
                                            }}
                                        />
                                        <TextField
                                            datatype="numeric"
                                            fullWidth
                                            placeholder=""
                                            variant="outlined"
                                            inputProps={{
                                                maxLength: 9,
                                                type: 'tel'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <Button
                                        className="btn"
                                        size="large"
                                        variant="outlined"
                                        disableElevation
                                        color="secondary"
                                        onClick={goToPreviousStep}
                                    >
                                        <ChevronLeftSharp />
                                        Précendent
                                    </Button>
                                </div>
                                <div className="form-actions" style={{ width: '100%', justifyContent: 'space-between' }}>
                                    <Button
                                        className="btn"
                                        size="large"
                                        variant="contained"
                                        disableElevation
                                        color="primary"
                                        onClick={() => { }}
                                    >
                                        Confirmer et Envoyer
                                        <SendOutlined style={{ marginLeft: 10 }} />
                                    </Button>
                                    <Button
                                        className="btn"
                                        size="large"
                                        variant="contained"
                                        disableElevation
                                        color="secondary"
                                        onClick={() => history.goBack()}
                                    >
                                        Anuler
                                        <CancelOutlined style={{ marginLeft: 10 }} />
                                    </Button>
                                </div>
                            </>
                        </FormBlockContainer>
                    }
                </section>
                <section className="illustration">
                    <Typography variant="h4" className="section-title">Demande de devis</Typography>

                    {/* <img src={buld} alt="illustration" /> */}
                </section>
            </div>
        </div>
    )
}