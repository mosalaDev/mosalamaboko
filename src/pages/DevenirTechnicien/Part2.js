import React, { useState, useEffect } from 'react';
import { Typography, Button, CircularProgress, Radio, FormControlLabel, Checkbox } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TextInput from '../../components/Inputs/TextInput';
import Select from '../../components/Inputs/Select';
import axios from '../../config/axios';
import { ageSlice, experiences, formations, useGetServices, organizations } from '../../customeFunctionalities/data';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { selectAll } from '../../redux/reducers/zones';
import { getUser } from '../../redux/reducers/user';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Part1() {
    const history = useHistory();
    const user = useSelector(getUser);
    const [service, setService] = useState({ id: '1', nom_service: 'Selectionnez un service' });
    const [specialites, setSpecialite] = useState([]);
    const [formateurs, setFormateurs] = useState([]);
    const [experience, setExperience] = useState(experiences[0]);
    const [organisation, setOrganisation] = useState('');
    const [zone, setZone] = useState({ id: '1' });
    const [adresseTravail, setAdresseTravail] = useState('');
    const [age, setAge] = useState(ageSlice[0]);
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [step, setStep] = useState(0);
    const [travaux, setTravaux] = useState([]);
    const [reqStatus, setReqStatus] = useState('idle');

    const zones = useSelector(selectAll);
    if (!zones.some(z => z.id === '1')) {
        zones.unshift({ id: '1', nom: 'Sélectionnez une zone' });
    }

    const servs = useGetServices().services;
    if (!servs.some(s => s.id === '1')) {
        servs.unshift({ id: '1', nom_service: 'Selectionnez un service' });
    }
    const services = servs;

    const canGoNext = (step === 0 && age.min) ||
        (step === 1 && service.id !== '1') ||
        (step === 2 && specialites.length > 0) ||
        (step === 3 && formateurs.length > 0) ||
        (step === 4 && organisation !== '') ||
        (step === 5 && experience.name);
    const handleGoNext = () => {
        if (step < 6 && canGoNext) {
            setStep(step => step + 1);
        }
        window.scrollTo(0, 0);
    };

    const handleGoBack = () => {
        if (step > 0) {
            setStep(step => step - 1);
        }
    };

    const handleSelectAge = (e) => {
        const a = ageSlice.find(ag => ag.min.toString() === e.target.value);

        setAge(a);
    };

    const handleSelectService = (e) => {
        const id = e.target.value;
        const serv = services.find(s => s.id === id);
        setService(serv);
    };

    const handleSelectWork = (e) => {
        let ws = specialites;
        const id = e.target.value;
        const w = travaux.find(t => t.id === id);

        if (e.target.checked) {
            ws = [...ws, {
                id: w.id,
                nom: w.nom_travail
            }];
        } else {
            ws = ws.filter(w => w.id !== id);
        }

        setSpecialite(ws);
    };

    const hadleChangeOrganization = (e) => {
        setOrganisation(e.target.value);
    };

    const handleExperience = (e) => {
        if (e.checked) {
            setExperience('');
            return;
        }

        const exp = experiences.find(ex => ex.id === e.target.value);

        setExperience(exp);
    };

    const handleSelectFormation = (e) => {
        let fs = formateurs;
        if (e.target.checked) {
            fs = [...fs, e.target.value];
        } else {
            fs = fs.filter(f => f !== e.target.value);
        }

        setFormateurs(fs);
    };

    const handleSelectZone = (e) => {
        const zn = zones.find(z => z.id === e.target.value);
        setZone(zn);
    };

    const canSubmit = (age.min) &&
        (service.id && service.id !== '1') &&
        (specialites.length > 0) &&
        (organisation !== '') &&
        (formateurs.length > 0) &&
        (experience.id) &&
        (adresseTravail !== '') &&
        (zone.id && zone.id !== '1');
    const handleSubmit = e => {
        e.preventDefault();

        if (!canSubmit) {
            return;
        }

        setLoading(true);

        const data = {
            formateurs: formateurs.toString(),
            specialites: specialites.map(sp => sp.id),
            service: service.id,
            debut_experience: experience.name,
            tranche_age: `${age.min} à ${age.max}`,
            organisation,
            adresse_travail: adresseTravail,
            zone: zone.id
        };
        axios
            .post(`/technicien`, data)
            .then(res => {
                const d = res.data;
                if (d.code) {
                    setServerError(d.message);
                } else {
                    setServerError(null);
                    setReqStatus(d.status);
                }
            })
            .catch(err => {
                setServerError(err.message);
            })
            .finally(() => setLoading(false));
    };

    const handleClose = () => {
        history.push("/");
    };

    useEffect(() => {
        if (service.id && service.id !== '1' && service.id !== 1) {
            let tr = [];
            service.gamme_travaux.forEach(g => {
                tr.push(...g.travaux);
            });
            setTravaux(tr);
        } else {
            setTravaux([]);
        }
    }, [service, services]);

    return (
        <div className="step tech-account">
            {reqStatus === 'success' ?
                <div style={{ height: 'calc(100vh - 80px)', display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h5" color="textPrimary" style={{ marginBottom: 20 }}>Demande envoyée</Typography>
                    <Typography variant="body1" color="textSecondary" style={{ maxWidth: 500 }}>Votre demande a été envoyée avec succès. Nous allons contacter le numéro <strong>{user.tel}</strong> pour la suite.</Typography>
                    <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        disableElevation
                        className="btn"
                        onClick={handleClose}
                        style={{ margin: '20px 0' }}
                    >
                        Ok
                    </Button>
                </div> :
                <div className="step2">
                    <div className="step-header">
                        <Typography variant="h3" className="step-title"><span>Etape 2.</span><span>Données du technicien</span></Typography>
                    </div>
                    {serverError && <Alert severity="error" variant="standard">{serverError}</Alert>}
                    <form>
                        {step === 0 &&
                            <div className="form-step">
                                <Typography className="form-step-title">Quel est votre tranche d'âge ?</Typography>
                                <div>
                                    {ageSlice.map(aS => (
                                        <label key={aS.min} htmlFor={aS.min.toString()} className="radio">
                                            <Radio
                                                type="radio"
                                                color="primary"
                                                checked={aS.min.toString() === age.min.toString()}
                                                id={aS.min.toString()}
                                                size="small"
                                                value={aS.min.toString()}
                                                onChange={handleSelectAge}
                                            />
                                            <Typography variant="body1">{aS.min} à {aS.max}</Typography>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        }
                        {step === 1 &&
                            <div className="form-step">
                                <Typography className="form-step-title">Quel est votre domaine ?</Typography>
                                <Select
                                    options={services}
                                    fullWidth
                                    onChange={handleSelectService}
                                    value={service.id}
                                    id="service"
                                />
                            </div>
                        }
                        {step === 2 &&
                            <div className="form-step">
                                <Typography className="form-step-title">Quelles sont vos spécialités ?</Typography>
                                <div className="check-container">
                                    {travaux.map(work => (
                                        <FormControlLabel
                                            className="m-checkbox"
                                            key={work.id}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    value={work.id}
                                                    onChange={handleSelectWork}
                                                    name={work.nom_travail}
                                                    color="primary"
                                                />
                                            }
                                            label={<Typography style={{ textTransform: "capitalize", color: '#444' }}>{work.nom_travail}</Typography>}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                        {step === 3 &&
                            <div className="form-step">
                                <Typography className="form-step-title">Où avez-vous passé votre formation ?</Typography>
                                <div className="formations">
                                    {formations.map(f => (
                                        <FormControlLabel
                                            className="m-checkbox"
                                            key={f}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    value={f}
                                                    onChange={handleSelectFormation}
                                                    name={f}
                                                    color="primary"
                                                />
                                            }
                                            label={<Typography style={{ textTransform: "capitalize", color: '#444' }}>{f}</Typography>}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                        {step === 4 &&
                            <div className="form-step">
                                <Typography className="form-step-title">Comment travaillez-vous pour le moment ?</Typography>
                                {organizations.map(org => (
                                    <label htmlFor={org} key={org} className="radio">
                                        <Radio type="radio" color="primary" size="small" checked={organisation === org} onChange={hadleChangeOrganization} id={org} value={org} />
                                        <Typography variant="body1">{org}</Typography>
                                    </label>
                                ))}
                            </div>
                        }
                        {step === 5 &&
                            <div className="form-step">
                                <Typography className="form-step-title">Depuis quelle année travaillez-vous dans ce domaine ?</Typography>
                                {experiences.map(e => (
                                    <label htmlFor={e.id} key={e.id} className="radio">
                                        <Radio
                                            type="radio"
                                            color="primary"
                                            size="small"
                                            checked={experience.id === e.id}
                                            onChange={handleExperience}
                                            id={e.id}
                                            value={e.id}
                                        />
                                        <Typography variant="body1">{e.name}</Typography>
                                    </label>
                                ))}
                            </div>
                        }
                        {step === 6 &&
                            <div className="form-step">
                                <Typography className="form-step-title">Où vos clients peuvent-ils vous trouver en permanence ?</Typography>
                                <div className="form-group">
                                    <Select
                                        label="Zone"
                                        options={zones}
                                        onChange={handleSelectZone}
                                        fullWidth
                                        value={zone.id}
                                        id="service"
                                    />
                                    <TextInput
                                        label="Adresse complete"
                                        id="adresse"
                                        nom="adresse_travail"
                                        value={adresseTravail}
                                        fullWidth
                                        onChange={e => setAdresseTravail(e.target.value)}
                                        placeholder="commune, quartier, avenue, numéro"
                                    />
                                </div>
                            </div>
                        }
                        <div className="form-actions">
                            {step > 0 &&
                                <Button
                                    className="btn"
                                    variant="outlined"
                                    color="primary"
                                    disableElevation
                                    onClick={handleGoBack}
                                    style={{ marginTop: 30 }}
                                    size="small"
                                >
                                    <ChevronLeft fontSize="small" color="inherit" />
                                    Precedent
                                </Button>
                            }
                            {step < 6 &&
                                <Button
                                    className="btn"
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    onClick={handleGoNext}
                                    style={{ marginTop: 30 }}
                                    size="small"
                                    disabled={!canGoNext}
                                >
                                    Suivant
                                    <ChevronRight fontSize="small" color="inherit" />
                                </Button>
                            }
                            {step === 6 &&
                                <Button
                                    className="btn"
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    onClick={handleSubmit}
                                    style={{ marginTop: 30 }}
                                    size="small"
                                    type="submit"
                                    disabled={!canSubmit}
                                >
                                    Soumettre la demande
                                    {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 15 }} />}
                                </Button>
                            }
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}
