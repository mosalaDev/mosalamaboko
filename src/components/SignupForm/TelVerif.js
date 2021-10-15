import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Fade, Typography, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TextInput from '../Inputs/TextInput';
import axios from '../../config/axios';
import NumberFormat from 'react-number-format';
import { CodeInput } from '../Inputs/TextInput';

const TelVerif = ({ tel, setTel, setIsValidCode }) => {
    const history = useHistory();
    const [codeSent, setCodeSent] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [verificationError, setVerificationError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState({});
    const [code, setCode] = useState('');

    const resetVerifyCode = () => {
        setCodeSent(false);
        setCode('');
        setVerificationError(null);
        setTel('');
        setIsValidCode(false);
    };


    const requestVerificationToken = () => {
        setCodeSent(false);
        setIsValidCode(false);
        setVerificationError(null);

        if (
            (tel.match(/^\d{10}$/) && (tel.startsWith("09") || tel.startsWith("08"))) ||
            (tel.match(/^\d{9}$/) && (tel.startsWith("9") || tel.startsWith("8")))) {
            setLoading(true);
            axios
                .get(`/user/verify/${tel}`)
                .then(res => {
                    const d = res.data;

                    if (d.code) {
                        if (d.code === 'user/exist') {
                            setUserExist(true);
                            setError((error) => ({ ...error, tel: null }));
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
        // Checking if the code does not have some unetered values
        if (code.indexOf('-') !== -1) {
            console.log("Mauvais code");
            setVerificationError("Mauvais code.");
            return;
        }

        // Reformating the code (Removing spaces)
        let c = "";
        for (let i = 0; i < code.length; i++) {
            if (code[i].indexOf(' ') === -1) {
                c = c.concat(code[i]);
            }
        }

        axios
            .post(`/user/verify/${tel}`, { code: c })
            .then(res => {
                const d = res.data;
                if (d.code) {
                    setVerificationError(d.message);
                } else if (d.status === "approved") {
                    setVerificationError(null);
                    setIsValidCode(true);
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

    const inputRef = useRef();
    const telRef = useRef();
    React.useEffect(() => {
        if (!codeSent) {
            if (telRef.current) {
                telRef.current.focus();
            }
        } else {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [codeSent]);

    return (
        <div style={{ width: '100%' }}>
            {verificationError && <Fade in={verificationError ? true : false} appear={true}><Alert style={{ width: '100%', marginBottom: 10 }} severity="error" variant="standard">{verificationError}</Alert></Fade>}
            <div style={{ width: '100%', maxWidth: 500 }}>
                {!codeSent ?
                    <Fade in={!codeSent} style={{ width: '100%' }}>
                        <div style={{ width: '100%', maxWidth: 400 }}>
                            <Typography variant="h5" className="section-title" style={{ textAlign: 'left' }}>Numéro de téléphone</Typography>
                            {userExist ?
                                <Fade in={userExist}>
                                    <div>
                                        <Alert severity="warning" color="warning">Le numéro {tel} a déjà un compte Mosala maboko.</Alert>
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
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: 15 }}>Entrez votre numéro de téléphone qui vous servira lors de la connexion à votre compte et dans vos communications avec Mosala maboko.</Typography>
                                    <div className="input-group tel" style={{ width: '100%' }}>
                                        <TextInput
                                            style={{ width: 52 }}
                                            datatype="numeric"
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
                                            inputProps={{ ref: telRef }}
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
                            <NumberFormat
                                format="#  #  #  #  #  #"
                                customInput={CodeInput}
                                allowNegative={false}
                                allowLeadingZeros={true}
                                mask="-"
                                placeholder="- - - - - -"
                                onChange={e => setCode(e.target.value)}
                                value={code}
                                inputRef={elt => (inputRef.current = elt)}
                            />
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

export default TelVerif;