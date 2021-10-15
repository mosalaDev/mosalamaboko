import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import './trouverArtisan.css';
import { Typography, Button, FormControlLabel, Checkbox, makeStyles, CircularProgress, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { ChevronRightSharp, ChevronLeftSharp, Close } from '@material-ui/icons';
import TextInput from '../../components/Inputs/TextInput';
import { CustomeModal, AppMessageModal } from '../../components';
import { DatePicker } from '../../components/Inputs/DateTimePicker';
import Select from '../../components/Inputs/Select';
import { UserAccount } from '../../components';

import axios from '../../config/axios';
import { useGetUrgentService, communes } from '../../customeFunctionalities/data';
import { getLocation } from '../../customeFunctionalities/helpers';
import { validateAddress, validateDateAndTime, validateWorks, validateUserCoords } from '../../customeFunctionalities/validators';
import { selectAll as selectAllZones } from '../../redux/reducers/zones';
import { getUser } from '../../redux/reducers/user';

export default function TrouverArtisan() {
    const history = useHistory();
    const user = useSelector(getUser);
    const { service } = useParams();
    const [chosen, setChosen] = useState(false);
    const [chosenService, setChosenService] = useState(null);
    const [step, setStep] = useState(0);
    const [gammes, setGammes] = useState([]);
    const [selectedGamme, setSelectedGamme] = useState({});
    const [works, setWorks] = useState([]);
    const [selectedWorks, setSelectedWorks] = useState([]);
    const [currentSelectedWork, setCurrentSelectedWork] = useState({});
    const [addQuantity, setAddQuantity] = useState(false);
    const [nbreObjet, setNbreObjet] = useState('1');
    const [details, setDetails] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [commune, setCommune] = useState(communes[0].name);
    const [quartier, setQuartier] = useState('');
    const [avenue, setAvenue] = useState('');
    const [num, setNum] = useState('');
    const [myPosition, setMyPosition] = useState(false);
    const [position, setPosition] = useState([]);
    const [hour, setHour] = useState('8');
    const [min, setMin] = useState('00');
    const [nom, setNom] = useState(user ? user.nom : '');
    const [prenom, setPrenom] = useState(user ? user.prenom : '');
    const [tel, setTel] = useState(user ? user.tel : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [sexe, setSex] = useState(user ? user.sexe === "H" ? "Homme" : "Femme" : '');
    const [date, setDate] = useState(new Date());
    const [loadingPosition, setLoadingPosition] = useState(false);
    const [showCancelMessage, setShowCancelMessage] = useState(false);
    const [saving, setSaving] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const [errors, setErrors] = useState({
        works: null,
        commune: null,
        quartier: null,
        avenue: null,
        num: null,
        date: null,
        tel: null,
        nom: null,
        prenom: null,
        email: null,
        sexe: null,
    });

    const { services } = useGetUrgentService();
    const zones = useSelector(selectAllZones);

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

    const handleSubmit = () => {
        const com = communes.find(c => c.name.toLowerCase() === commune.toLowerCase());
        const zone = zones.find(z => z.nom.toLowerCase() === com.district.toLowerCase());

        const date_w = new Date();

        const data = { gravite: 'urgence', nom, prenom, sexe, tel, email, date_w, commune, quartier, avenue, num, position, zone: zone.id, service: chosenService.id, travaux: selectedWorks, details };

        setSaving(true);
        axios.post('/reservation', data)
            .then(res => {
                const data = res.data;
                if (!data.code) {
                    setHasFinished(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setSaving(false));
    };

    const handleCancel = () => {
        setShowCancelMessage(true);
    };

    const handleSetSelectGamme = (gamme) => {
        setSelectedGamme(gamme);
        setWorks(gamme.travaux);
        setStep(step + 1);
    };

    const goToNextStep = () => {
        if (step >= 5) {
            return;
        }
        let valid = true;
        switch (step) {
            case 1:
                valid = validateWorks(selectedWorks, details);
                if (!valid) {
                    setErrors(errors => ({ ...errors, works: 'Selectionnez un au moin travail ou ajoutez quelques détails concernant les travaux.' }));
                } else {
                    setErrors(errors => ({ ...errors, works: null }));
                }
                break;
            case 2:
                const { valid: v, error } = validateAddress(commune, quartier, avenue, num);
                valid = v;
                setErrors(errors => ({
                    ...errors,
                    ...error
                }));
                break;
            case 3:
                const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, min);
                valid = validateDateAndTime(d);
                if (!valid) {
                    setErrors(errors => ({ ...errors, date: 'Mauvaise date ou heure selectionnée. La date et l\'heure ne doivent pas être inferieures à l\'instant présent.' }));
                } else {
                    setErrors(errors => ({ ...errors, date: null }));
                }
                break;
            case 4:
                const { error: err, valid: val } = validateUserCoords(tel, nom, prenom, sexe, email);
                valid = val;
                setErrors(errors => ({ ...errors, ...err }));
                break;
            default:
                break;
        }

        if (valid) {
            setStep(step + 1);
        }
    };

    const selectWork = (e) => {
        let ws = selectedWorks;
        let id = e.target.value;
        const w = works.find(t => t.id === id);

        if (e.target.checked) {
            if (w.objet) {
                toggleAddQuantity();
                setCurrentSelectedWork(w);
            } else {
                ws.push({
                    id: w.id,
                    nom: w.nom_travail
                });
                setCurrentSelectedWork(w);
            }
        } else {
            ws = ws.filter(t => t.id !== id);
        }

        setSelectedWorks(ws);
    };

    const selectWorkWithNbreObj = (e) => {
        e.preventDefault();
        const ws = selectedWorks;
        ws.push({
            id: currentSelectedWork.id,
            nbreObjet,
            nom: currentSelectedWork.nom_travail
        });

        setSelectedWorks(ws);
        toggleAddQuantity();
    };

    const toggleAddQuantity = () => {
        setAddQuantity(!addQuantity);
        setNbreObjet('1');
    };

    const goToPreviousStep = () => {
        setStep(step - 1);

        if (step < 1) {
            setSelectedWorks([]);
        }


        if (step === 2) {
            setMyPosition(false);
        }

        if (step <= 3) {
            setUrgent(false);
        }
    };

    const handleChangeCommune = (evt) => {
        setCommune(evt.target.value);
    };

    const handleGetCurrentPosition = () => {
        setMyPosition(val => !val);
    };

    const handleUrgent = () => {
        setUrgent(!urgent);
        if (step === 2) {
            setStep(step => (step + 1));
        }
    };

    const handleSelectDate = (date) => {
        setDate(date);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    useEffect(() => {
        if (myPosition) {
            setLoadingPosition(true);
            getLocation((err, position) => {
                if (err) {
                    console.log(err);
                } else {
                    setPosition([position.coords.longitude, position.coords.latetude]);
                }
                setLoadingPosition(false);
            });
        } else {
            setPosition([]);
        }
    }, [myPosition]);

    useEffect(() => {
        const serv = services.find(s => s.nom_service.toLowerCase() === service.toLowerCase());
        if (serv) {
            setChosenService(serv);
            setChosen(true);
            setGammes(serv.gamme_travaux);
        }
    }, [service, services]);

    const classes = useStyles();
    return (
        <div className="main-container">
            {chosen &&
                <>
                    {hasFinished ?
                        <div className={classes.infoContainer}>
                            <div className={classes.infoInnerContainer}>
                                <Typography variant="h5" color="textPrimary">Demande envoyée</Typography>
                                <Typography variant="body1" color="textSecondary">Votre demande a été envoyée avec succès. Nous allons contacter le numéro <strong>{tel}</strong> pour confirmer votre reservation.</Typography>
                                <Button
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    disableElevation
                                    className="btn"
                                    onClick={() => history.goBack()}
                                >
                                    Ok
                                </Button>
                            </div>
                        </div> :
                        <div className="content trouver-artisan">
                            <div className="banner" style={{ background: `url(${chosenService.banner}`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="container">
                                    <div className="inner-banner">
                                        <Typography variant="h4" className="content-title">Trouver un {chosenService.nomination}</Typography>
                                        <Typography variant="body1" className="content-detail">Il est simple de trouver un technicien pour votre travail, fournissez les informations demandées ci-dessous.</Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="content-container">
                                <div className="container">
                                    <div className="reservation-form">
                                        <div className="content-body">
                                            {step === 0 &&
                                                <div className="form-block">
                                                    <div className="block-content">
                                                        <Typography variant="h5" className="content-title">Description des travaux</Typography>
                                                        <Typography variant="body1" style={{ fontWeight: 700, color: '#444', marginBottom: 10 }}>Sur quoi le technicien va travailler ?</Typography>
                                                        {errors.works &&
                                                            <Alert severity="error" color="error">{errors.works}</Alert>
                                                        }
                                                        <div className={`f-group ${classes.gammeList}`}>
                                                            {gammes.map(gamme => (
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
                                                    </div>
                                                </div>
                                            }
                                            {step === 1 &&
                                                <div className="form-block">
                                                    <div className="block-content">
                                                        <Typography variant="h5" className="content-title">Autres description des travaux</Typography>
                                                        <Typography variant="body1" style={{ fontWeight: 700, color: '#444', marginBottom: 10 }}>Donnez plus de description des travaux.</Typography>
                                                        {errors.works &&
                                                            <Alert severity="error" color="error">{errors.works}</Alert>
                                                        }
                                                        <div className="f-group">
                                                            <div className={classes.checkboxContainer}>
                                                                {works.map((work) => (
                                                                    <FormControlLabel
                                                                        className="m-checkbox"
                                                                        key={work.id}
                                                                        style={{ textTransform: 'capitalize' }}
                                                                        control={
                                                                            <Checkbox
                                                                                size="small"
                                                                                value={work.id}
                                                                                onChange={(e) => selectWork(e)}
                                                                                name={work.nom_travail}
                                                                                color="secondary"
                                                                                checked={selectedWorks.some(w => w.id === work.id)}
                                                                            />
                                                                        }
                                                                        label={work.nom_travail}
                                                                    />
                                                                ))}
                                                            </div>
                                                            {addQuantity &&
                                                                <CustomeModal open={addQuantity} handleClose={toggleAddQuantity} contentContainerStyles={{ borderRadius: 5, position: 'relative' }}>
                                                                    <form onSubmit={selectWorkWithNbreObj} className={classes.addQuantityContainer}>
                                                                        <IconButton onClick={toggleAddQuantity} style={{ position: 'absolute', top: 0, right: 0 }}>
                                                                            <Close fontSize="small" color="disabled" />
                                                                        </IconButton>
                                                                        <Typography variant="h6" color="textSecondary">Nombre {currentSelectedWork.objet}</Typography>
                                                                        <TextInput
                                                                            type="number"
                                                                            value={nbreObjet}
                                                                            onChange={e => setNbreObjet(e.target.value)}
                                                                            inputProps={{ min: 1 }}
                                                                        />
                                                                        <Button
                                                                            className="btn"
                                                                            variant="contained"
                                                                            color="primary"
                                                                            type="submit"
                                                                            style={{ marginTop: 10 }}
                                                                        >
                                                                            Ok
                                                                        </Button>
                                                                    </form>
                                                                </CustomeModal>
                                                            }
                                                            <div style={{ marginTop: 20 }} className="f-group">
                                                                <TextInput
                                                                    label="Autres détails ?"
                                                                    placeholder="Votre text ici..."
                                                                    multiline={true}
                                                                    rows={3}
                                                                    rowsMax={5}
                                                                    fullWidth
                                                                    value={details}
                                                                    onChange={(e) => setDetails(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                                        <Button
                                                            className="btn"
                                                            size="large"
                                                            variant="text"
                                                            disableElevation
                                                            color="default"
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
                                                </div>
                                            }
                                            {step === 2 &&
                                                <div className="form-block">
                                                    <div className="block-content">
                                                        <Typography variant="h5" className="content-title">Lieu d'intervation</Typography>
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
                                                                        fullWidth
                                                                        value={num}
                                                                        onChange={(e) => setNum(e.target.value)}
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
                                                                        inputStyles={{ marginTop: 10 }}
                                                                        fullWidth
                                                                        placeholder="Nom du quartier"
                                                                        value={quartier}
                                                                        onChange={e => setQuartier(e.target.value)}
                                                                        error={errors.quartier ? true : false}
                                                                        helperText={errors.quartier}
                                                                    />
                                                                    <TextInput
                                                                        label="Avenue"
                                                                        fullWidth
                                                                        placeholder="Nom de l'avenue"
                                                                        inputStyles={{ marginTop: 10 }}
                                                                        style={{ marginTop: 15 }}
                                                                        value={avenue}
                                                                        onChange={e => setAvenue(e.target.value)}
                                                                        error={errors.avenue ? true : false}
                                                                        helperText={errors.avenue}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Typography style={{ marginBottom: 15 }} variant="body2" color="textSecondary">Appuyer sur le bouton ci-dessous si vous êtes actuellement au lieu où se feront les travaux.</Typography>
                                                            <Button
                                                                variant={(myPosition && position.length > 1) ? "contained" : "outlined"}
                                                                color="secondary"
                                                                className="btn"
                                                                style={{ marginBottom: 10 }}
                                                                onClick={handleGetCurrentPosition}
                                                                disableElevation
                                                            >
                                                                Ma position (ici)
                                                                {loadingPosition && <CircularProgress size={10} color="secondary" />}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="form-actions" style={{ justifyContent: 'space-between' }}>
                                                        <Button
                                                            className="btn"
                                                            size="large"
                                                            variant="text"
                                                            disableElevation
                                                            color="default"
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
                                                </div>
                                            }
                                            {step === 3 &&
                                                <div className="form-block">
                                                    <div className="block-content">
                                                        <Typography variant="h5" className="content-title">Date et heure d'intervation</Typography>
                                                        {errors.date &&
                                                            <Alert severity="error" color="error">{errors.date}</Alert>
                                                        }
                                                        <div className="f-group">
                                                            <Button
                                                                variant="outlined"
                                                                color="secondary"
                                                                className="btn"
                                                                style={{ marginBottom: 15 }}
                                                                onClick={handleUrgent}
                                                            >
                                                                Maintenant (urgence)
                                                            </Button>
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
                                                                                options={[0, 10, 20, 30, 40, 50].map((e) => {
                                                                                    if (e < 10) {
                                                                                        return "0" + e
                                                                                    }

                                                                                    return e;
                                                                                })}
                                                                            />
                                                                        </div>
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
                                                            color="default"
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
                                                </div>
                                            }
                                            {step === 4 &&
                                                <div className="form-block">
                                                    <div className="block-content">
                                                        <Typography variant="h5" style={{ textAlign: 'center' }} className="content-title">Donées du client</Typography>
                                                        <UserAccount
                                                            goToNextStep={goToNextStep}
                                                            goToPreviousStep={goToPreviousStep}
                                                            classes={classes}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                            {step === 5 &&
                                                <div className="form-block">
                                                    <div className="block-content center-flex-column-content center-text">
                                                        <div>
                                                            <Typography variant="h5" className="content-title">Votre demande</Typography>
                                                        </div>
                                                        <div style={{ width: '100%' }}>
                                                            <Typography variant="body1" color="textSecondary">Vous cherchez un {chosenService.nomination} pour :</Typography>
                                                            <Typography variant="h6">{selectedGamme.nom}</Typography>
                                                            <ul className={`align-start-flex-column-content ${classes.workTable}`}>
                                                                <li className={`flex-container ${classes.workTableRow} ${classes.workTableHeader}`}>
                                                                    <span className={`flex-2 ${classes.workTableCol}`}>Travail</span><span className={`flex-1 ${classes.workTableCol}`}>Nombre d'objets</span>
                                                                </li>
                                                                {selectedWorks.map(sw => (
                                                                    <li key={sw.id} className={`flex-container ${classes.workTableRow}`}>
                                                                        <span className={`flex-2 ${classes.workTableCol}`}>{sw.nom}</span><p className={`flex-1 ${classes.workTableCol}`}>{sw.nbreObjet ? sw.nbreObjet : "Non definie"}</p>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div style={{ margin: '15px 0' }}>
                                                                <Typography variant="body2" className={classes.userDataDisplay}><span>Frais de transport et communication (technicien)</span></Typography>
                                                                <div style={{ marginTop: 10 }}>
                                                                    <Typography variant="h5" color="textSecondary">5000Fc</Typography>
                                                                    <Typography style={{ marginTop: 5 }} variant="body2" color="textSecondary">A payer avant le début des travaux.</Typography>
                                                                </div>
                                                            </div>
                                                            <div className="margin-t-30">
                                                                <Typography variant="body1" color="textSecondary" style={{ textAlign: 'justify' }}>En appuyant sur <strong>confirmer</strong> vous acceptez les <Link to="#" className="important-link">conditions d'utlisation</Link> de Mosala maboko.</Typography>
                                                                <div className="flex-container margin-t-20" style={{ justifyContent: 'space-between' }}>
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
                                                                            message="Etes-vous sûr de vouloir arreter le processus de reservation ?"
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
                                                                        {saving && <CircularProgress size={10} />}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    )
}


const useStyles = makeStyles(theme => ({
    checkboxContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: 10,
    },
    addQuantityContainer: {
        backgroundColor: '#fff',
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 290,
        textAlign: 'center'
    },
    blockDescription: {
        textAlign: 'center',
        marginTop: 15,
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
    workTable: {
        border: '1px solid #eaeaea',
        margin: '15px 0'
    },
    workTableHeader: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
    },
    workTableRow: {
        "&:not(:last-child)": {
            borderBottom: '1px solid #eaeaea'
        }
    },
    workTableCol: {
        padding: '3px 10px',
        "&:not(:last-child)": {
            borderRight: '1px solid #eaeaea'
        },
        "&:last-child": {
            textAlign: 'center',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        }
    },
    infoContainer: {
        width: '100%',
        height: 'calc(100vh - 70px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 10px'
    },
    infoInnerContainer: {
        maxWidth: 700,
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        "& >*:not(:last-child)": {
            marginBottom: 20
        }
    },
    [theme.breakpoints.down('xs')]: {
        checkboxContainer: {
            gridTemplateColumns: '1fr',
        }
    }
}));