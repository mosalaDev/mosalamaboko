import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import { Typography, Button, CircularProgress, Checkbox, FormControlLabel, Fade } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TextInput from '../Inputs/TextInput';
import Select from '../Inputs/Select';
import { validateSignUp, passwordValidator, validateIdentity } from '../../customeFunctionalities/validators';
import { useHistory } from 'react-router-dom';
import TelVerif from './TelVerif';
import Password from './Password';

const SignupForm = ({ successCallback }) => {
    const [tel, setTel] = useState('');
    const [isValidCode, setIsValidCode] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [sexe, setSexe] = useState('');
    const [conditionsAccepted, setConditionAccepted] = useState(false);
    const [error, setError] = useState({});
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);

    const handleAcceptConditions = (e) => {
        setConditionAccepted(e.target.checked);
    };

    const goNextStep = () => {
        const { error: err, valid } = validateIdentity(email, nom, prenom, sexe);
        if (step === 1 && valid) {
            setStep(step + 1);
            setError({});
        } else {
            setError(err);
        }
    };

    const history = useHistory();
    const canSubmit = passwordValidator(password) && password === confirmPassword && conditionsAccepted;
    const handleSubmit = (e) => {
        e.preventDefault();

        const { error, valid } = validateSignUp(tel, email, nom, prenom, sexe, password, confirmPassword, conditionsAccepted);

        setError(error);

        if (!valid || loading) {
            return;
        }

        setLoading(true);

        const data = { tel, password, nom, prenom, email, sexe };

        axios
            .post('/user/signup', data)
            .then(res => {
                setServerError(null);
                if (res.data.code) {
                    setServerError(res.data.message);
                    window.scrollTo(0, 0);
                } else {
                    if (typeof successCallback === 'function') {
                        successCallback(password, tel);
                    } else {
                        history.goBack();
                    }
                }

            })
            .catch(() => {
                console.log("Une erreur s'est produite lors de la vérification. Veuillez réessayer après quelques secondes.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <form className="signup-form">
            <Typography variant="h5" style={{ marginBottom: 20 }}>Création de compte</Typography>
            <div>
                {serverError && <Fade in={serverError}><Alert style={{ width: '100%', marginBottom: 10 }} severity="error" variant="standard">{serverError}</Alert></Fade>}
                {!isValidCode &&
                    <TelVerif tel={tel} setTel={setTel} setIsValidCode={(value) => { setIsValidCode(value); setStep(1) }} />
                }
                {(isValidCode && step === 1) &&
                    <Fade in={isValidCode} style={{ width: '100%', maxWidth: 500 }}>
                        <div>
                            <Typography variant="h5" className="section-title" style={{ textAlign: 'left' }}>Mosala maoko a besoin de queques informations.</Typography>
                            <Typography variant="body2" color="textSecondary" style={{ textAlign: 'left', marginBottom: 10 }}>(*) Veut dire que le champs est obligatoire pour la création de votre compte.</Typography>
                            <TextInput
                                label="Nom (*)"
                                name="nom"
                                id="nom"
                                type="text"
                                placeholder="Votre nom ou postnom"
                                fullWidth
                                value={nom}
                                inputStyles={{ marginTop: 5 }}
                                style={{ marginTop: 15 }}
                                onChange={e => setNom(e.target.value)}
                                error={error.nom ? true : false}
                                helperText={error.nom}
                            />
                            <TextInput
                                label="Prénom (*)"
                                name="prenom"
                                id="prenom"
                                type="text"
                                placeholder="Votre prénom"
                                fullWidth
                                value={prenom}
                                inputStyles={{ marginTop: 5 }}
                                style={{ marginTop: 15 }}
                                onChange={e => setPrenom(e.target.value)}
                                error={error.prenom ? true : false}
                                helperText={error.prenom}
                            />
                            <Select
                                label="Sexe (*)"
                                name="sexe"
                                id="sexe"
                                fullWidth
                                value={sexe}
                                inputStyle={{ marginTop: 5 }}
                                style={{ flex: 1, marginTop: '15px' }}
                                options={[{ name: 'Homme', id: 'M' }, { name: 'Femme', id: 'H' }]}
                                onChange={(e) => setSexe(e.target.value)}
                                error={error.sexe ? true : false}
                                helperText={error.sexe}
                            />
                            <TextInput
                                label="Email"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="ex. exemple@mail.exemple"
                                fullWidth
                                value={email}
                                inputStyles={{ marginTop: 5 }}
                                style={{ marginTop: 15 }}
                                onChange={e => setEmail(e.target.value)}
                                error={error.email ? true : false}
                                helperText={error.email}
                            />
                            <div className="actions" style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Button
                                    className="btn"
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    onClick={goNextStep}
                                    style={{ marginTop: 20 }}
                                >
                                    Suivant
                                    {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 15 }} />}
                                </Button>
                            </div>
                        </div>
                    </Fade>
                }
                {step === 2 &&
                    <Fade in={step === 2} style={{ width: '100%', maxWidth: 500 }}>
                        <div>
                            <Password error={error} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} />
                            <FormControlLabel
                                className="check-action"
                                control={
                                    <Checkbox
                                        className="cond-chbx"
                                        size="small"
                                        value={conditionsAccepted}
                                        onChange={handleAcceptConditions}
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography variant="body2" style={{ color: error.conditions ? 'red' : '#444' }}>
                                        J'accepte les <Link to="#" style={{ color: "#FF7A00" }}>conditions d'utilisation</Link> de mosala maboko
                                    </Typography>
                                }
                            />
                            <div style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Button
                                    className="btn"
                                    variant="text"
                                    color="primary"
                                    disableElevation
                                    type="submit"
                                    onClick={() => setStep(step - 1)}
                                    style={{ marginTop: 30 }}
                                >
                                    Precedent
                                </Button>
                                <Button
                                    className="btn"
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    type="submit"
                                    onClick={handleSubmit}
                                    style={{ marginTop: 30 }}
                                    disabled={!canSubmit}
                                >
                                    Créer votre compte
                                    {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 15 }} />}
                                </Button>
                            </div>
                        </div>
                    </Fade>
                }
            </div>
        </form>
    )
}

export default SignupForm;