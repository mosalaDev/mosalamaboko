import React, { useState } from 'react';
import { Fade, Typography } from '@material-ui/core';
import TextInput from '../Inputs/TextInput';
import { passwordStrengthMesure, passwordValidator } from '../../customeFunctionalities/validators';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Password = ({ password, setPassword, confirmPassword, setConfirmPassword, error, title }) => {
    const [passQuality, setPassQuality] = useState('Mauvaise');

    const onPasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        const q = passwordStrengthMesure(val);
        setPassQuality(q);
    };

    return (
        <div>
            <Typography variant="h5" className="section-title" style={{ textAlign: 'left' }}>{title ? title : "Votre mot de passe."}</Typography>
            <Typography variant="body2" color="textSecondary" style={{ textAlign: 'left', marginBottom: 10 }}>Votre mot de passe doit avoir au moins 8 caractères, lettres et chiffres mélangés. Vous pouvez ajouter aussi des caractères spéciaux.</Typography>
            <TextInput
                label="Mot de passe (*)"
                id="password"
                type="password"
                fullWidth
                value={password}
                onChange={onPasswordChange}
                inputStyles={{ marginTop: 5 }}
                style={{
                    marginTop: 15
                }}
                error={error.password ? true : false}
                helperText={error.password}
            />
            {password !== '' &&
                <Fade in={password !== ''}>
                    <Typography variant="caption" style={{ fontWeight: 500, display: 'flex', alignItems: 'center', marginTop: 10 }}>
                        Qualité du mot de passe: <span style={{ color: passwordValidator(password) ? 'green' : 'red', marginLeft: 5 }}>{passQuality}</span>
                        {passwordValidator(password) ?
                            <CheckCircleOutlineIcon color="inherit" style={{ marginLeft: 5, color: 'green' }} /> :
                            <HighlightOffIcon color="error" style={{ marginLeft: 5, color: 'red' }} />
                        }
                    </Typography>
                </Fade>
            }
            <TextInput
                label="Confirmer mot de passe (*)"
                type="password"
                id="cofirm_password"
                fullWidth
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                inputStyles={{ marginTop: 5 }}
                style={{
                    marginTop: 15
                }}
                error={error.confirmPassword ? true : false}
                helperText={error.confirmPassword}
            />
        </div>
    )
}

export default Password;