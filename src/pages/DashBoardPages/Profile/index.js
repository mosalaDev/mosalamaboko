import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './profile.css';
import { actions, getUser } from '../../../redux/reducers/user';
import { Avatar, Button, CircularProgress, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import join from '../../../assets/join.svg';
import TextInput from '../../../components/Inputs/TextInput';
import Select from '../../../components/Inputs/Select';
import { updateUser, getErrors, getReqStatus, isUpdating } from '../../../redux/reducers/user';
import { validateUpdateUser } from '../../../customeFunctionalities/validators';
import { formatDate } from '../../../customeFunctionalities/helpers';

export default function Profile() {
    const user = useSelector(getUser);
    const [modif, setModif] = useState(false);
    const [nom, setNom] = useState(user.nom);
    const [tel, setTel] = useState(user.tel);
    const [prenom, setPrenom] = useState(user.prenom);
    const [sexe, setSexe] = useState(user.sexe);
    const [email, setEmail] = useState(user.email);
    const [ville, setVille] = useState(user.ville);
    const [commune, setCommune] = useState(user.commune);
    const reqStatus = useSelector(getReqStatus);
    const serverError = useSelector(getErrors);
    const updating = useSelector(isUpdating);
    const [error, setError] = useState({});

    const toggleModif = () => {
        setModif(!modif);
    };

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const { error, valid } = validateUpdateUser(user, tel, email, nom, prenom, sexe, ville, commune);

        if (!valid || updating) {
            setError(error);
            return;
        }
        const data = {};

        let canUpdate = false;

        if (nom !== user.nom) {
            data.nom = nom;
            canUpdate = true;
        }
        if (tel !== user.tel) {
            data.tel = tel;
            canUpdate = true;
        }
        if (prenom !== user.prenom) {
            data.prenom = prenom;
            canUpdate = true;
        }
        if (sexe !== user.sexe) {
            data.sexe = sexe;
            canUpdate = true;
        }
        if (ville !== user.ville) {
            data.ville = ville;
            canUpdate = true;
        }
        if (commune !== user.commune) {
            data.commune = commune;
            canUpdate = true;
        }
        if (email && email !== user.email) {
            data.email = email;
            canUpdate = true;
        }

        if (canUpdate) {
            dispatch(updateUser(data)).then(() => {
                setError(errors => ({ ...errors, server: null }));
                if (window.innerWidth <= 1000) {
                    window.scrollTo(0, 250);
                } else {
                    window.scrollTo(0, 100);
                }
            });
        } else {
            setError(errors => ({ ...errors, server: 'Aucun changement n\'a été éfectué !' }));
            if (window.innerWidth <= 1000) {
                window.scrollTo(0, 250);
            } else {
                window.scrollTo(0, 100);
            }
        }

    };

    React.useEffect(() => {
        if (reqStatus === 'fulfilled') {
            setModif(false);
            dispatch(actions.resetStatus());
        }
    }, [dispatch, reqStatus]);

    return (
        <section className="dash-content profile">
            <header>
                <Typography variant="h2" className="dash-bg-title">{user.prenom} {user.nom}</Typography>
            </header>
            <article className="main-content">
                <Typography variant="h5" className="dash-sm-title">Activités du compte</Typography>
                <div className="horizontal-list">
                    <div className="dash-card">
                        <Typography variant="body1">Réservations</Typography>
                        <Typography variant="caption" color="textSecondary">Urgentes ou non urgentes</Typography>
                        <Typography variant="body2">{user.reservations}</Typography>
                    </div>
                    <div className="dash-card">
                        <Typography variant="body1">Devis</Typography>
                        <Typography variant="caption" color="textSecondary">Devis demandés</Typography>
                        <Typography variant="body2">{user.devis}</Typography>
                    </div>
                </div>
                <div>
                    <Typography variant="h5" className="dash-sm-title">Profile utilisateur</Typography>
                    <div className="user-data">
                        <Avatar className="user-avatar" variant="circle">{user.prenom[0]}</Avatar>
                        <div className="user-description">
                            {modif ?
                                <form>
                                    {serverError && <Alert severity="error" variant="standard">{serverError}</Alert>}
                                    {error.server && <Alert severity="error" variant="standard">{error.server}</Alert>}
                                    <TextInput
                                        label="Téléphone *"
                                        name="tel"
                                        id="tel"
                                        type="tel"
                                        fullWidth
                                        value={tel}
                                        inputStyles={{ marginTop: 5 }}
                                        onChange={e => setTel(e.target.value)}
                                        error={error.tel ? true : false}
                                        helperText={error.tel}
                                    />
                                    <TextInput
                                        label="Email"
                                        name="email"
                                        id="email"
                                        type="email"
                                        fullWidth
                                        value={email}
                                        inputStyles={{ marginTop: 5 }}
                                        style={{ marginTop: 15 }}
                                        onChange={e => setEmail(e.target.value)}
                                        error={error.email ? true : false}
                                        helperText={error.email}
                                    />
                                    <TextInput
                                        label="Nom *"
                                        name="nom"
                                        id="nom"
                                        type="text"
                                        fullWidth
                                        value={nom}
                                        inputStyles={{ marginTop: 5 }}
                                        style={{ marginTop: 15 }}
                                        onChange={e => setNom(e.target.value)}
                                        error={error.nom ? true : false}
                                        helperText={error.nom}
                                    />
                                    <TextInput
                                        label="Prenom *"
                                        name="prenom"
                                        id="prenom"
                                        type="text"
                                        fullWidth
                                        value={prenom}
                                        inputStyles={{ marginTop: 5 }}
                                        style={{ marginTop: 15 }}
                                        onChange={e => setPrenom(e.target.value)}
                                        error={error.prenom ? true : false}
                                        helperText={error.prenom}
                                    />
                                    <Select
                                        label="Sexe *"
                                        name="sexe"
                                        id="sexe"
                                        fullWidth
                                        value={sexe}
                                        inputStyle={{ marginTop: 5 }}
                                        style={{ flex: 1, marginTop: '15px' }}
                                        options={[{ name: 'Homme', id: 'M' }, { name: 'Femme', id: 'F' }]}
                                        onChange={(e) => setSexe(e.target.value)}
                                        error={error.sexe ? true : false}
                                        helperText={error.sexe}
                                    />
                                    <TextInput
                                        label="Ville *"
                                        name="ville"
                                        id="ville"
                                        type="text"
                                        fullWidth
                                        value={ville}
                                        inputStyles={{ marginTop: 5 }}
                                        style={{ marginTop: 15 }}
                                        onChange={e => setVille(e.target.value)}
                                        error={error.ville ? true : false}
                                        helperText={error.ville}
                                        disabled
                                    />
                                    <TextInput
                                        label="Commune *"
                                        name="commune"
                                        id="commune"
                                        type="text"
                                        fullWidth
                                        value={commune}
                                        inputStyles={{ marginTop: 5 }}
                                        style={{ marginTop: 15 }}
                                        onChange={e => setCommune(e.target.value)}
                                        error={error.commune ? true : false}
                                        helperText={error.commune}
                                    />
                                    <div>
                                        <Button
                                            variant="outlined"
                                            color="default"
                                            className="btn"
                                            size="small"
                                            onClick={toggleModif}
                                        >Annuler</Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="btn"
                                            size="small"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Enregistrer
                                            {updating && <CircularProgress size={10} style={{ marginLeft: 7 }} color="inherit" />}
                                        </Button>
                                    </div>
                                </form> :
                                <>
                                    <ul className="vertical-list">
                                        <li className="data-list-item">
                                            <span>Téléphone</span> : <span>{user.tel}</span>
                                        </li>
                                        <li className="data-list-item">
                                            <span>Nom</span> : <span>{user.nom}</span>
                                        </li>
                                        <li className="data-list-item">
                                            <span>Prenom</span> : <span>{user.prenom}</span>
                                        </li>
                                        <li className="data-list-item">
                                            <span>Email</span> : <span>{user.email}</span>
                                        </li>
                                        <li className="data-list-item">
                                            <span>Ville</span> : <span>{user.ville}</span>
                                        </li>
                                    </ul>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className="btn"
                                        size="small"
                                        onClick={toggleModif}
                                    >Modifier</Button>
                                </>
                            }
                            <div className="join">
                                <img src={join} alt="rejoindre" />
                                {user.account_type !== "artisan" ?
                                    <Link to="/devenir_technicien/1">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="btn"
                                            size="small"
                                            disableElevation
                                        >Rejoindre l'équipe de techniciens</Button>
                                    </Link> :
                                    <div style={{ marginTop: 20 }}>
                                        <Typography variant="body2">Rejoint le {formatDate(user.createdAt)}</Typography>
                                    </div>
                                }
                            </div>
                            {/* <div className="danger-zone">
                                <div>
                                    <Typography variant="h5" className="dash-sm-title">Zone de danger</Typography>
                                </div>
                                <Button
                                    variant="outlined"
                                    className="btn"
                                    color="secondary"
                                    size="small"
                                >Supprimer ce compte</Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}
