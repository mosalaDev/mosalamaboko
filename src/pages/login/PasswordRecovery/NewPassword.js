import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Password from '../../../components/SignupForm/Password';
import axios from '../../../config/axios';
import { validateChangePassword } from '../../../customeFunctionalities/validators';
import Alert from '@material-ui/lab/Alert';
import { AppMessageModal } from '../../../components';

export default function NewPassword() {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passWordSet, setPassWordSet] = useState(false);
    const token = localStorage.getItem("resset_token");

    const handleFinish = () => {
        history.push("/connexion");
        localStorage.setItem("ressetToken", "");
    };

    const canSubmit = password !== "" && token !== "" && confirmPassword === password;
    const submit = (e) => {
        e.preventDefault();

        const { valid, error } = validateChangePassword(password, confirmPassword);
        setError(error);

        if (valid) {
            setLoading(true);
            axios
                .post(`/user/reset_password`, { token, password })
                .then(res => {
                    const d = res.data;

                    if (d.code) {
                        setServerError(d.message);
                    } else {
                        if (d.status === 'success') {
                            setPassWordSet(true);
                        }
                    }
                })
                .catch(err => {
                    setServerError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    };

    return (
        <div>
            {serverError && <Alert variant="standard" color="error" severity="error" style={{ marginBottom: 10 }}>{serverError}</Alert>}
            <Password
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                error={error}
                title="Votre nouveau mot de passe"
            />
            <Button
                variant="contained"
                disableElevation
                color="primary"
                className="btn"
                type="submit"
                onClick={submit}
                disabled={!canSubmit}
                style={{ marginTop: 20 }}
            >
                Enregistrer le nouveau mot de passe
                {loading && <CircularProgress size={10} style={{ marginLeft: 10 }} color="inherit" />}
            </Button>
            {passWordSet &&
                <AppMessageModal
                    open={passWordSet}
                    message="Votre mot de passe a été modifié avec succès. Aller à la page de connexion pour vous connecter."
                    handleClose={handleFinish}
                />
            }
        </div>
    )
}
