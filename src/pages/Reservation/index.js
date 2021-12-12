import React, { useState, useEffect, useRef, useCallback } from 'react';
import './reservation.css';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logo.png';
import { useHistory, Link, useParams } from 'react-router-dom';
import { makeStyles, useMediaQuery, useTheme, IconButton, Typography, Button, FormGroup, FormControlLabel, Radio, Checkbox, CircularProgress, LinearProgress, Fade } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Close, ChevronRightSharp, ChevronLeftSharp } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { AppMessageModal, CustomeModal as Modal, UserAccount } from '../../components';
import Select from '../../components/Inputs/Select';
import TextInput from '../../components/Inputs/TextInput';
import Switch from '../../components/Inputs/switch';
import { DatePicker } from '../../components/Inputs/DateTimePicker';
import { communes, useGetServices } from '../../customeFunctionalities/data';
import ReactGA from 'react-ga';

import { selectAll as selectAllZones } from '../../redux/reducers/zones';
import { getToken, getUser } from '../../redux/reducers/user';
import { createReservation, getReqStatus } from '../../redux/reducers/reservations';
import { validateService, validateAddress, validateWorks, validateDateAndTime } from '../../customeFunctionalities/validators';
import { getLocation } from '../../customeFunctionalities/helpers';

import moment from 'moment';

const Reservation = () => {
    const {serviceId} = useParams();
    const history = useHistory();
    const user = useSelector(getUser);
    const [step, setStep] = useState(0);
    const [selectedService, setSelectedService] = useState({});
    const [gammes, setGammes] = useState([]);
    const [works, setWorks] = useState([]);
    const [selectedWorks, setSelectedWorks] = useState([]);
    const [autresTravaux, setAutresTravaux] = useState('');
    const [commune, setCommune] = useState('KINSHASA');
    const [quartier, setQuartier] = useState('');
    const [avenue, setAvenue] = useState('');
    const [num, setNum] = useState('');
    const [position, setPosition] = useState([]);
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState('8');
    const [min, setMin] = useState('00');
    const [allowLocation, setAllowLocation] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [category, setCategory] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [createdReservation, setCreatedReservation] = useState(null);
    const [showCancelMessage, setShowCancelMessage] = useState(false);
    const [errors, setErrors] = useState({
        works: null,
        services: null,
        commune: null,
        quartier: null,
        avenue: null,
        num: null,
        tel: null,
        nom: null,
        prenom: null,
        sexe: null,
        email: null,
        date: null,
        position: null
    });

    const fBRef = useRef();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const [stepperOrientation, setStepperOrientation] = useState('verical');

    const steps = ['Services', 'Catégorie', 'Travaux', 'Lieu', 'Date et heure', 'Client'];
    const cancelActions = [
        {
            label: 'Non',
            onClick: () => { setShowCancelMessage(false); },
            color: 'primary'
        },
        {
            label: 'Oui',
            onClick: () => { history.goBack(); },
            color: 'default'
        },
    ];

    const zones = useSelector(selectAllZones);
    const { services, loading: loadingServices } = useGetServices();

    const handleClose = () => {
        history.goBack();
    };

    const handleGoToReservation = () => {
        if (!createdReservation) {
            return;
        }

        history.push(`/client/${user.username}/reservations/${createdReservation.id}`);
    };

    const handleCancel = () => {
        setShowCancelMessage(true);
    };

    const token = useSelector(getToken);
    const dispatch = useDispatch();
    const saving = useSelector(getReqStatus);
    const handleSubmit = () => {
        const com = communes.find(c => c.name.toLowerCase() === commune.toLowerCase());
        const zone = zones.find(z => z.nom.toLowerCase() === com.district.toLowerCase());

        const date_w = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min, 0, 0);

        const d = moment(date_w.toISOString());
        const today = moment();
        const dif = d.diff(today, 'days');

        const gravite = dif <= 2 ? 'urgence' : 'retardé';

        const data = { gravite, date_w, commune, quartier, avenue, num, position, zone: zone.id, service: selectedService.id, travaux: selectedWorks, autresTravaux };

        dispatch(createReservation(data, token))
            .then(res => {
                const d = res.payload;
                if (!d.code) {
                    setIsFinished(true);
                    setCreatedReservation(d);
                }
            });
    };

    const changeService = useCallback((serviceId) => {
        const service = services.find(s => s.id.toString() === serviceId);
        let gammes = [];

        setSelectedService(service ? service : {});
        gammes = service ? service.gamme_travaux : [];

        setGammes(gammes);
    })

    const handleSelectService = (e) => {
        const checked = e.target.checked;        
        if (!checked) {
            setSelectedService({});
        } else {
            changeService(e.target.value);
        }
    };

    const handleSetSelectGamme = (gamme) => {
        setWorks(gamme.travaux);
        setCategory(true);
        setStep(step + 1);
    };

    const handleChangeWork = (e) => {
        let ws = selectedWorks;
        const id = e.target.value;
        const w = works.find(t => t.id === id);

        if (e.target.checked) {
            ws.push({
                id: w.id,
                nom: w.nom_travail
            });
        } else {
            ws = ws.filter(w => w.id !== id);
        }

        setSelectedWorks(ws);
    };

    const handleAllowLocation = (e) => {
        const checked = e.target.checked;
        if (!checked) {
            setAllowLocation(false);
            setPosition([]);
            setLoadingLocation(false);
        } else {
            setLoadingLocation(true);
            getLocation((err, position) => {
                if (err) {
                    setErrors(errors => ({ ...errors, position: 'Erreur de connexion...' }));
                } else {
                    setAllowLocation(checked);
                    setPosition([position.coords.longitude, position.coords.latitude]);
                }

                setLoadingLocation(false);
            });
        }
    };

    const handleChangeCommune = (e) => {
        setCommune(e.target.value);
    };

    const handleSelectDate = (date) => {
        setDate(date);
    };

    const goToNextStep = useCallback(() => {
        if (step > 5) {
            return;
        }
        let valid = true;
        switch (step) {
            case 0:
                valid = validateService(selectedService.id);
                if (!valid) {
                    setErrors(errors => ({ ...errors, services: 'Selectionnez au moins un service.' }));
                } else {
                    setErrors(errors => ({ ...errors, services: null }));
                }
                break;
            case 1:
                if (!category) {
                    valid = false;
                }
                break;
            case 2:
                valid = validateWorks(selectedWorks, autresTravaux);
                if (!valid) {
                    setErrors(errors => ({ ...errors, works: 'Selectionnez ou ajoutez au moin un travail.' }));
                } else {
                    setErrors(errors => ({ ...errors, works: null }));
                }
                break;
            case 3:
                const { valid: v, error } = validateAddress(commune, quartier, avenue, num);
                valid = v;
                setErrors(errors => ({
                    ...errors,
                    ...error
                }));
                break;
            case 4:
                const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min);
                valid = validateDateAndTime(d);
                if (!valid) {
                    setErrors(errors => ({ ...errors, date: 'Mauvaise date ou heure selectionnée. La date et l\'heure ne doivent pas être inferieures à l\'instant présent.' }));
                } else {
                    setErrors(errors => ({ ...errors, date: null }));
                }
                break;
            default:
                break;
        }

        if (valid) {
            setStep(step + 1);
        }
    });


    const goToPreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }

        if (step <= 3) {
            setSelectedWorks([]);
            setErrors(error => ({ ...errors, works: null }));
        }
    };

    const goToStep = (step, activeStep) => {
        if (step <= 4 && step >= 0 && activeStep > step) {
            setStep(step);
        }

        if (step < 1) {
            setSelectedWorks([]);
            setErrors(errors => ({ ...errors, works: null }));
        }
    };

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])
    
    useEffect(() => {
        if (serviceId && services.length > 0) {
            changeService(serviceId);
            goToNextStep();
        }
    }, [changeService, goToNextStep, serviceId, services]);

    useEffect(() => {
        if (fBRef.current) {
            fBRef.current.scrollTo(0, 0);
        }
    }, [step]);

    useEffect(() => {
        if (matches) {
            setStepperOrientation('horizontal');
        } else {
            setStepperOrientation('vertical');
        }
    }, [matches]);
    const classes = useStyles();

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="h4" className={classes.question}>Sélection de service</Typography>
                                <Typography variant="body1" color="textSecondary" className={classes.blockDescription}>Sélectionnez le service que vous voulez réserver.</Typography>
                                {errors.services &&
                                    <Alert severity="error" color="error">{errors.services}</Alert>
                                }
                            </div>
                            <div className={classes.artisanList}>
                                {services.map((service) => (
                                    <div key={service.id} className={classes.card}>
                                        <label htmlFor={service.id} className={classes.cardInfo}>
                                            <div className={classes.icon}>
                                                <img src={service.image} alt={service.nom_service} />
                                            </div>
                                            <Typography variant="body1" className={classes.cardTitle}>{service.nom_service}</Typography>
                                        </label>
                                        <Radio type="radio" color="primary" size="small" checked={selectedService.id === service.id} onChange={handleSelectService} id={service.id} value={service.id} className={classes.checkbox} />
                                    </div>
                                ))}
                            </div>
                            <div className="form-actions" style={{ justifyContent: 'flex-end' }}>
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
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={`${classes.blockHeader} center-flex-column-content`}>
                                <Typography variant="h5" className={classes.question}>Catégorie des travaux</Typography>
                                <Typography variant="body1" color="inherit" className={classes.blockDescription}>Sélectionnez l'une des catégories ci-dessous.</Typography>
                                <div className={classes.gammeList}>
                                    {gammes.length === 0 ?
                                        <Typography variant="h6" color="textSecondary">Aucune information pour ce service pour l'instant</Typography> :
                                        gammes.map(gamme => (
                                            <Button
                                                key={gamme.id}
                                                className={`btn ${classes.gammeBtn}`}
                                                size="large"
                                                variant="outlined"
                                                disableElevation
                                                color="primary"
                                                onClick={() => handleSetSelectGamme(gamme)}
                                                fullWidth
                                            >
                                                {gamme.nom}
                                                <ChevronRightSharp />
                                            </Button>
                                        ))}
                                </div>
                                <Button
                                    className={`btn`}
                                    style={{ marginTop: 10 }}
                                    size="large"
                                    variant="text"
                                    disableElevation
                                    color="primary"
                                    onClick={goToPreviousStep}
                                >
                                    <ChevronLeftSharp style={{ marginRight: 10 }} />
                                    Changer le service
                                </Button>
                            </div>
                        </div>
                    </div>);
            case 2:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="body1" className={classes.question}>Détails des travaux</Typography>
                                <Typography variant="body1" color="textSecondary" className={classes.blockDescription}>Sélectionnez les travaux. Si un travail que vous voulez réserver ne figure pas dans la liste, ajoutez le dans le champs <span style={{ fontWeight: 'bold' }}>autre travail</span>.</Typography>
                                {errors.works &&
                                    <Alert severity="error" color="error">{errors.works}</Alert>
                                }
                            </div>
                            <FormGroup row className={classes.checkboxGroup}>
                                {works.map((work) => (
                                    <FormControlLabel
                                        className="m-checkbox"
                                        key={work.id}
                                        control={
                                            <Checkbox
                                                size="small"
                                                value={work.id}
                                                onChange={handleChangeWork}
                                                name={work.nom_travail}
                                                color="secondary"
                                            />
                                        }
                                        label={<Typography style={{ textTransform: "capitalize", color: '#444' }}>{work.nom_travail}</Typography>}
                                    />
                                ))}
                            </FormGroup>
                            <div style={{ marginTop: 20 }} className="f-group">
                                <TextInput
                                    label="Autre travail ?"
                                    placeholder="Votre text ici"
                                    multiline={true}
                                    rowsMax={5}
                                    fullWidth
                                    value={autresTravaux}
                                    onChange={(e) => setAutresTravaux(e.target.value)}
                                />
                            </div>
                            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                <Button
                                    className="btn"
                                    size="large"
                                    variant="text"
                                    disableElevation
                                    color="secondary"
                                    onClick={goToPreviousStep}
                                >
                                    <ChevronLeftSharp />
                                    Précédent
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
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="h5" className={classes.question}>Lieu d'intervation</Typography>
                            </div>
                            <div className="f-group">
                                <div className="location">
                                    <div className="location-group">
                                        <Select
                                            label="Commune"
                                            id="services"
                                            value={commune}
                                            options={communes}
                                            fullWidth
                                            onChange={handleChangeCommune}
                                            error={errors.commune ? true : false}
                                            helperText={errors.commune}
                                        />
                                        <TextInput
                                            label="Numéro"
                                            value={num}
                                            onChange={(e) => setNum(e.target.value)}
                                            fullWidth
                                            inputStyles={{ marginTop: 10 }}
                                            placeholder="Numéro de la parcelle"
                                            style={{ marginTop: 15 }}
                                            error={errors.num ? true : false}
                                            helperText={errors.num}
                                        />
                                    </div>
                                    <div className="location-group">
                                        <TextInput
                                            label="Quartier"
                                            value={quartier}
                                            onChange={e => setQuartier(e.target.value)}
                                            inputStyles={{ marginTop: 10 }}
                                            fullWidth
                                            placeholder="Nom du quartier"
                                            error={errors.quartier ? true : false}
                                            helperText={errors.quartier}
                                        />
                                        <TextInput
                                            label="Avenue"
                                            value={avenue}
                                            onChange={e => setAvenue(e.target.value)}
                                            fullWidth
                                            placeholder="Nom de l'avenue"
                                            inputStyles={{ marginTop: 10 }}
                                            style={{ marginTop: 15 }}
                                            error={errors.avenue ? true : false}
                                            helperText={errors.avenue}
                                        />
                                    </div>
                                </div>
                                <div className={classes.position}>
                                    <Typography variant="body1" style={{ textAlign: 'start', marginBottom: 10 }}>Coordonnées géographiques</Typography>
                                    <Typography variant="body1" color="textSecondary" className={classes.inputDescription}>Si votre position actuelle est le lieu d'intervention, activez la locatisation.</Typography>
                                    <Switch
                                        name="coords"
                                        label="Activer ma position"
                                        checked={allowLocation}
                                        handleChange={handleAllowLocation}
                                    />
                                    {loadingLocation && <CircularProgress size={10} />}
                                </div>
                            </div>
                            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                <Button
                                    className="btn"
                                    size="large"
                                    variant="text"
                                    disableElevation
                                    color="secondary"
                                    onClick={goToPreviousStep}
                                >
                                    <ChevronLeftSharp />
                                    Précédent
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
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="h5" className={classes.question}>Date et heure d'intervention</Typography>
                                {errors.date &&
                                    <Alert severity="error" color="error">{errors.date}</Alert>
                                }
                            </div>
                            <div className="f-group">
                                <div className=" date-time">
                                    <div className="picker">
                                        <Typography variant="body2" className="label" style={{ textAlign: 'start' }}>Date</Typography>
                                        <DatePicker
                                            selectedDate={date}
                                            setSelectedDate={handleSelectDate}
                                            fullWidth
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
                                                    options={[0, 10, 20, 30, 40, 50].map((e, i) => {
                                                        if (e < 10) {
                                                            return "0" + e
                                                        }

                                                        return "" + e
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                <Button
                                    className="btn"
                                    size="large"
                                    variant="text"
                                    disableElevation
                                    color="secondary"
                                    onClick={goToPreviousStep}
                                >
                                    <ChevronLeftSharp />
                                    Précédent
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
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <div className={classes.blockHeader}>
                                <Typography variant="h5" className={classes.question}>Compte utilisateur</Typography>
                            </div>
                            <UserAccount
                                goToNextStep={goToNextStep}
                                goToPreviousStep={goToPreviousStep}
                                classes={classes}
                            />
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className={classes.formBlock}>
                        <div className={classes.innerBlock}>
                            <Fade in={true}>
                                <div className={`${classes.lastBlock}`}>
                                    {saving === 'loading' &&
                                        <div className={classes.saving}>
                                            <LinearProgress color="primary" />
                                        </div>
                                    }
                                    <div className={classes.blockHeader}>
                                        <Typography variant="h5" className={classes.lastTitle}>Réservation {selectedService.nom_service}</Typography>
                                        <div className={classes.lastStep}>
                                            <Typography variant="body2" className={classes.userDataDisplay}>
                                                <span>Client</span>
                                                <span>{user.tel}</span>
                                            </Typography>
                                            <Typography variant="body2" className={classes.userDataDisplay}>
                                                <span>Adresse</span>
                                                <span>{commune}, {quartier} {avenue} {num}</span>
                                            </Typography>
                                            <Typography variant="body2" className={classes.userDataDisplay}>
                                                <span>Date et heure</span>
                                                <span>{date.toLocaleDateString('en-GB')} {hour}:{min}</span>
                                            </Typography>
                                            <div style={{ margin: '15px 0' }}>
                                                <Typography variant="body2" className={classes.userDataDisplay}><span>Travaux réservés</span></Typography>
                                                <ul style={{ padding: '10px 0', color: '#444', maxHeight: 75, overflowY: 'auto', listStyle: 'inside' }}>
                                                    {selectedWorks.map(w => {
                                                        return (
                                                            <li key={w.id}>{w.nom}</li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                            <div style={{ margin: '15px 0' }}>
                                                <Typography variant="body2" className={classes.userDataDisplay}><span>Frais de transport et communication (technicien)</span></Typography>
                                                <div style={{ marginTop: 10 }}>
                                                    <Typography variant="h5" color="textSecondary">5000Fc</Typography>
                                                    <Typography style={{ marginTop: 5 }} variant="body2" color="textSecondary">A payer avant le début des travaux.</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.outerFormActions}>
                                        <Typography variant="body1" color="textSecondary" style={{ textAlign: 'justify' }}>En appuyant sur <strong>confirmer</strong> vous acceptez les <Link to="/aide/cgus" target="_blank" className="important-link">conditions d'utlisation</Link> de Mosala maboko.</Typography>
                                        <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                            <Button
                                                className="btn"
                                                size="large"
                                                fullWidth
                                                variant="text"
                                                disableElevation
                                                color="primary"
                                                onClick={handleCancel}
                                                style={{ maxWidth: 100 }}
                                            >
                                                Non merci
                                            </Button>
                                            {showCancelMessage &&
                                                <AppMessageModal
                                                    open={showCancelMessage}
                                                    handleClose={() => setShowCancelMessage(false)}
                                                    actions={cancelActions}
                                                    message="Etes-vous sûr de vouloir arrêter le processus de réservation ?"
                                                />
                                            }
                                            <Button
                                                className="btn"
                                                size="large"
                                                fullWidth
                                                variant="contained"
                                                disableElevation
                                                color="primary"
                                                onClick={handleSubmit}
                                                style={{ maxWidth: 110 }}
                                            >
                                                Confirmer
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        </div>
                    </div>
                );
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <Modal open={true} handleClose={handleClose} contentContainerStyles={{ padding: 0, borderRadius: 0 }}>
            <div className={`reservation ${classes.container}`}>
                {isFinished ?
                    <Fade in={isFinished}>
                        <div className={classes.infoContainer}>
                            <div className={classes.infoInnerContainer}>
                                <div className={classes.logo} style={{ height: '100%', width: 110 }}>
                                    <div className="logo-image">
                                        <img src={logo} alt="logo" />
                                    </div>
                                </div>
                                <Typography variant="h5" color="textPrimary">Merci d'avoir fait une réservation</Typography>
                                <Typography variant="body1" color="textSecondary">Votre demande est encours de traitement. Nous allons bientôt vous contacter pour la confirmation de l'affectation.</Typography>
                                <div className="form-actions">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        disableElevation
                                        className="btn"
                                        onClick={handleClose}
                                        size="small"
                                    >
                                        Ok
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        disableElevation
                                        className="btn"
                                        onClick={handleGoToReservation}
                                    >
                                        Aller voir la réservation
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Fade> :
                    <>
                        <div className={classes.pageHeader}>
                            <div className={classes.logo} style={{ height: '100%' }}>
                                <div className="logo-image">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                            <Typography variant="h1" className={classes.title} color="primary">Reserver une prestation</Typography>
                            <IconButton className={classes.closeBtn} onClick={handleClose}>
                                <Close fontSize="small" />
                            </IconButton>
                        </div>
                        {loadingServices ?
                            <div className={classes.loading}>
                                <CircularProgress size={30} color="primary" />
                            </div> : (
                                <div className={classes.body}>
                                    <Stepper activeStep={step} orientation={stepperOrientation} className={classes.stepper}>
                                        {steps.map((label, index) => (
                                            <Step key={label} onClick={() => goToStep(index, step)} style={{ cursor: 'pointer' }}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <div className={classes.formBlockContainer} ref={fBRef}>
                                        {getStepContent(step)}
                                    </div>
                                </div>
                            )
                        }
                    </>
                }
            </div>
        </Modal>
    )
}


const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#fbfbfb',
        position: 'relative',
        width: '100vw',
        height: '100vh',
    },
    infoContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 10px'
    },
    infoInnerContainer: {
        maxWidth: 500,
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff',
        padding: 20,
        boxShadow: '0px 0px 20px #cfcfcf',
        "& >*:not(:last-child)": {
            marginBottom: 20
        }
    },
    loading: {
        width: '100%',
        height: '100%',
        backgroundColor: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        position: 'relative',
        boxShadow: '1px 1px 1px #efefef',
    },
    logo: {
        width: '70px'
    },
    closeBtn: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 20,
    },
    title: {
        textTransform: 'uppercase',
        fontSize: '14px!important',
        fontWeight: "700!important",
        flex: 1,
        marginLeft: 20,
    },
    body: {
        display: 'flex',
        height: 'calc(100% - 75px)',
        position: 'relative'
    },
    stepper: {
        backgroundColor: 'inherit',
        height: '56%',
        "& .MuiStepIcon-active": {
            color: theme.palette.secondary.main
        },
        "& .MuiStepIcon-completed": {
            color: theme.palette.secondary.main
        }
    },
    formBlockContainer: {
        flex: 1,
        height: '100%',
        overflowY: 'auto'
    },
    formBlock: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100%',
        padding: '20px 0',
    },
    innerBlock: {
        width: 670,
        margin: 'auto',
        padding: '0 10px',
    },
    lastBlock: {
        width: 500,
        padding: 20,
        margin: 'auto',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflowX: 'hidden',
        boxShadow: '0px 0px 20px #cfcfcf'
    },
    saving: {
        position: 'absolute',
        top: '-1px',
        left: '-10px',
        right: '-10px',
    },
    artisanList: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 20,
        marginTop: 15,
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        position: 'relative',
        border: '1px solid #e6e6e673'
    },
    cardTitle: {
        textTransform: 'capitalize'
    },
    cardInfo: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        paddingRight: 35,
        cursor: 'pointer',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    checkbox: {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
    },
    blockHeader: {
        margin: '0 0 25px 0'
    },
    question: {
        textAlign: 'center',
        fontSize: '35px!important',
    },
    blockDescription: {
        textAlign: 'center',
        marginTop: 15,
    },
    inputDescription: {
        fontSize: '17px!important',
        marginBottom: 10
    },
    checkboxGroup: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 10,
        width: '100%',
    },
    position: {
        margin: '20px 0'
    },
    lastStep: {
        margin: '15px 0'
    },
    lastStepDetails: {
        margin: '10px 0'
    },
    userDataDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '2px 0',
        color: '#444!important',
        "& span:first-child": {
            fontWeight: '600',
            fontSize: 15,
        }
    },
    gammeList: {
        margin: '10px 0',
        width: '100%',
        textAlign: 'center'
    },
    gammeBtn: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    connexionForms: {
        width: '100%',
        minWidth: 400,
    },
    [theme.breakpoints.down('sm')]: {
        stepper: {
            height: 'fit-content',
            maxWidth: 670,
            margin: 'auto',
        },
        body: {
            flexDirection: 'column',
        },
        blockDescription: {
            marginTop: 10,
        },
        artisanList: {
            gridTemplateColumns: 'auto',
            gap: 10
        },
        innerBlock: {
            width: '100%',
            maxWidth: 600
        },
        question: {
            fontSize: '30px!important'
        }
    },
    [theme.breakpoints.down('xs')]: {
        title: {
            marginLeft: 10,
            fontSize: '12px !important',
        },
        stepper: {
            padding: '15px!important',
            "& > div > span > span:last-child": {
                display: 'none'
            }
        },
        innerBlock: {
            paddingBottom: 50
        },
        checkboxGroup: {
            gridTemplateColumns: 'auto',
        },
        question: {
            fontSize: '25px!important'
        },
        lastBlock: {
            position: 'static',
            width: '100%',
        },
        connexionContainer: {
            width: '90%'
        },
        connexionForms: {
            minWidth: '100%',
            "& > form": {
                padding: '30px 20px'
            }
        }
    },
}))

export default Reservation;
