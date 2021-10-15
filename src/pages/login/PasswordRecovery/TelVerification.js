import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Fade, Typography, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TextInput from '../../../components/Inputs/TextInput';
import axios from '../../../config/axios';

const TelVerification = () => {
    const history = useHistory();
    const [tel, setTel] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [userExist, setUserExist] = useState(true);
    const [verificationError, setVerificationError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState({});
    const [code, setCode] = useState({
        fst: '', snd: '', trd: '', frth: '', fth: '', sth: ''
    });

    const inputRef = useRef();
    const fst = useRef();
    const snd = useRef();
    const trd = useRef();
    const frth = useRef();
    const fth = useRef();
    const sth = useRef();

    const resetVerifyCode = () => {
        setCodeSent(false);
        setCode({ fst: '', snd: '', trd: '', frth: '', fth: '', sth: '' });
        setVerificationError(null);
        setTel('');
    };


    const requestVerificationToken = () => {
        setCodeSent(false);
        setVerificationError(null);

        if (
            (tel.match(/^\d{10}$/) && (tel.startsWith("09") || tel.startsWith("08"))) ||
            (tel.match(/^\d{9}$/) && (tel.startsWith("9") || tel.startsWith("8")))) {
            setLoading(true);

            axios
                .get(`/api/user/reset_password/${tel}/request_code`)
                .then(res => {
                    const d = res.data;

                    if (d.code) {
                        if (d.code === 'user/not_exist') {
                            setUserExist(false);
                            setError(null);
                        } else {
                            setVerificationError(d.message);
                        }
                        console.log(d.message);
                    } else if (d.status === 'pending') {
                        setVerificationError(null);
                        setCodeSent(true);
                        console.log(d);
                    }
                })
                .catch(err => {
                    setVerificationError('Echec dans la requête du code de vérification.');
                    setError({ server: err.message });
                    console.log(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError(error => ({ ...error, tel: 'Mauvais numéro de téléphone.' }));
        }

    };

    const submitTelVerificationToken = () => {
        setVerifying(true);
        const c = `${code.fst}${code.snd}${code.trd}${code.frth}${code.fth}${code.sth}`;

        axios
            .post(`/api/user/reset_password/${tel}/resset_password_token`, { code: c })
            .then(res => {
                const d = res.data;

                if (d.code) {
                    console.log(d.message);
                    setVerificationError(d.message);
                } else if (d.status === "approved") {
                    setVerificationError(null);
                    localStorage.setItem("resset_token", d.token);
                    history.push('/mot_de_passe_oublié/nouveau');
                } else {
                    setVerificationError("Echec de verification, mauvais code de vérification.");
                }
            })
            .catch(err => {
                setVerificationError(err.message);
                console.log(err.message);
            })
            .finally(() => setVerifying(false));
    };

    const onCodeChange = (e, name) => {
        const val = e.target.value;

        setCode(code => ({ ...code, [name]: val }));

        if (name === 'fst' && snd.current) {
            if (val === "") {
                return;
            }

            snd.current.focus();
        } else if (name === 'snd' && trd.current) {
            if (val === "") {
                fst.current.focus();
                return;
            }

            trd.current.focus();
        } else if (name === 'trd' && frth.current) {
            if (val === "") {
                snd.current.focus();
                return;
            }

            frth.current.focus();
        } else if (name === 'frth' && fth.current) {
            if (val === "") {
                trd.current.focus();
                return;
            }

            fth.current.focus();
        } else if (name === 'fth' && sth.current) {
            if (val === "") {
                frth.current.focus();
                return;
            }

            sth.current.focus();
        } else if (name === 'sth' && fth.current) {
            if (val === "") {
                fth.current.focus();
                return;
            }

            sth.current.focus();
        }
    };

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div style={{ width: '100%' }}>
            {verificationError && <Fade in={verificationError} appear={true}><Alert style={{ width: '100%', marginBottom: 10 }} severity="error" variant="standard">{verificationError}</Alert></Fade>}
            <div style={{ width: '100%', maxWidth: 500 }}>
                {!codeSent ?
                    <Fade in={!codeSent} style={{ width: '100%' }}>
                        <div style={{ width: '100%', maxWidth: 400 }}>
                            <Typography variant="h5" className="section-title" style={{ textAlign: 'left' }}>Numéro de téléphone</Typography>
                            {!userExist ?
                                <Fade in={userExist}>
                                    <div>
                                        <Alert severity="warning" color="warning">Le numéro {tel} n'a pas de compte Mosala maboko.</Alert>
                                        <Typography variant="body2" style={{ marginTop: 15 }}>Un numéro de téléphone ne peut en aucun cas avoir deux comptes d'utilisateur Mosala maboko.</Typography>
                                        <div style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Button
                                                className="btn"
                                                variant="contained"
                                                color="primary"
                                                disableElevation
                                                onClick={() => { history.push('/connexion'); }}
                                                style={{ marginTop: 20 }}
                                            >
                                                Me connecter
                                            </Button>
                                            <Button
                                                className="btn"
                                                variant="text"
                                                color="default"
                                                disableElevation
                                                onClick={() => setUserExist(false)}
                                                style={{ marginTop: 20 }}
                                            >
                                                Modifier le numéro
                                            </Button>
                                        </div>
                                    </div>
                                </Fade> :
                                <div style={{ width: '100%' }}>
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: 15 }}>Entrez le numéro de téléphone que vous aviez utilisé lors de la création de votre compte.</Typography>
                                    <div className="input-group tel" style={{ width: '100%' }}>
                                        <TextInput
                                            style={{ width: 52 }}
                                            datatype="numeric"
                                            defaultValue="+243"
                                            disabled
                                            placeholder="+243"
                                            variant="outlined"
                                            inputProps={{
                                                style: {
                                                    color: '#555',
                                                    paddingLeft: 5,
                                                    paddingRight: 5,
                                                }
                                            }}
                                        />
                                        <TextInput
                                            ref={inputRef}
                                            name="tel"
                                            id="tel"
                                            type="tel"
                                            fullWidth
                                            placeholder="Votre numéro de téléphone"
                                            value={tel}
                                            onChange={e => setTel(e.target.value)}
                                            error={error.tel ? true : false}
                                            helperText={error.tel}
                                            style={{ flex: 1 }}
                                        />
                                    </div>
                                    <div className="actions" style={{ width: '100%' }}>
                                        <Button
                                            className="btn"
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            onClick={requestVerificationToken}
                                            style={{ marginTop: 30 }}
                                        >
                                            Suivant
                                            {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 15 }} />}
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </Fade> :
                    <Fade in={codeSent}>
                        <div>
                            <Typography variant="h5" className="section-title" style={{ textAlign: 'left', marginBottom: 10 }}>Vérification du numéro de téléphone</Typography>
                            <Typography variant="body2" color="textSecondary" style={{ textAlign: 'left', marginBottom: 10 }}>Un code à 6 chiffres a été envoyé au numéro de téléphone {tel}.</Typography>
                            <label className="code-input">
                                <input ref={fst} maxLength={1} placeholder="-" value={code.fst} onChange={e => onCodeChange(e, 'fst')} />
                                <input ref={snd} maxLength={1} placeholder="-" value={code.snd} onChange={e => onCodeChange(e, 'snd')} />
                                <input ref={trd} maxLength={1} placeholder="-" value={code.trd} onChange={e => onCodeChange(e, 'trd')} />
                                <input ref={frth} maxLength={1} placeholder="-" value={code.frth} onChange={e => onCodeChange(e, 'frth')} />
                                <input ref={fth} maxLength={1} placeholder="-" value={code.fth} onChange={e => onCodeChange(e, 'fth')} />
                                <input ref={sth} maxLength={1} placeholder="-" value={code.sth} onChange={e => onCodeChange(e, 'sth')} />
                            </label>
                            <Button
                                className="btn"
                                variant="text"
                                color="default"
                                disableElevation
                                onClick={resetVerifyCode}
                                style={{ marginTop: 20 }}
                            >
                                Changer le numéro de téléphone
                            </Button>
                            <div className="actions" style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Button
                                    className="btn"
                                    variant="outlined"
                                    color="default"
                                    disableElevation
                                    onClick={submitTelVerificationToken}
                                    style={{ marginTop: 20 }}
                                >
                                    Verifier
                                    {verifying && <CircularProgress size={10} color="inherit" style={{ marginLeft: 15 }} />}
                                </Button>
                                <Button
                                    className="btn"
                                    variant="text"
                                    color="secondary"
                                    disableElevation
                                    onClick={requestVerificationToken}
                                    style={{ marginTop: 20, flex: 1 }}
                                >
                                    Je n'ai pas reçu le code
                                    {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 15 }} />}
                                </Button>
                            </div>
                        </div>
                    </Fade>
                }
            </div>
        </div>
    )
}

export default TelVerification;