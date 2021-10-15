/* eslint-disable no-useless-escape */
import { communes } from './data';

export const validateService = (service) => {
    if (service === '') {
        return false;
    }

    return true;
};
export const validateWorks = (works, autresTravaux) => {
    if (works.length <= 0 && autresTravaux === "") {
        return false;
    }

    return true;
};

export const validateAddress = (commune, quartier, avenue, num) => {
    let error = { commune: null, quartier: null, avenue: null, num: null };
    let valid = true;

    if (!communes.some(c => c.name === commune)) {
        error.commune = 'Selectionnez une commune.';
        valid = false;
    } else {
        error.commune = null;
    }

    if (!quartier || quartier === "") {
        error.quartier = 'Le quartier est réquis';
        valid = false;
    } else {
        error.quartier = null;
    }

    if (!avenue || avenue === "") {
        error.avenue = 'Le nom de l\'avenue est réquis.';
        valid = false;
    } else {
        error.avenue = null;
    }

    if (!num || num === "") {
        error.num = 'Le numéro de la parcelle est réquis.';
        valid = false;
    } else {
        error.num = null;
    }

    return { error, valid };
};

export const validateDateAndTime = (date) => {
    if (!(date instanceof Date)) {
        return false;
    }

    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    const h = date.getHours();

    const today = new Date();

    if (y < today.getFullYear()) {
        return false;
    }

    if (y === today.getFullYear && m < today.getMonth()) {
        return false;
    }

    if (y === today.getFullYear() && m === today.getMonth() && d < today.getDate()) {
        return false;
    }

    if (y === today.getFullYear() && m === today.getMonth() && d === today.getDate() && h <= today.getHours()) {
        return false;
    }

    return true;
};

export const validateUserCoords = (tel, nom, prenom, sexe, email) => {
    const error = { tel: null, nom: null, prenom: null, sexe: null, email: null };
    let valid = true;

    if ((tel.match(/^\d{10}$/) && (tel.startsWith("09") || tel.startsWith("08"))) || (tel.match(/^\d{9}$/) && (tel.startsWith("9") || tel.startsWith("8")))) {
        error.tel = null;
    } else {
        error.tel = 'Verifiez votre numéro de téléphone';
        valid = false;
    }

    if (!nom || nom === "" || nom === " ") {
        error.nom = 'Le nom est réquis';
        valid = false;
    } else {
        error.nom = null;
    }
    if (!prenom || prenom === "" || prenom === " ") {
        error.prenom = 'Le prenom est réquis';
        valid = false;
    } else {
        error.prenom = null;
    }
    if (!sexe || sexe === "" || sexe === " ") {
        error.sexe = 'Ce champ est réquis';
        valid = false;
    } else {
        error.sexe = null;
    }
    if (email || email !== "") {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            error.email = 'Mauvais adresse mail';
            valid = false;
        } else {
            error.email = null;
        }
    }

    return { error, valid };
};


export const validateIdentity = (email, nom, prenom, sexe) => {
    let valid = true;
    let error = {
        email: null, nom: null, prenom: null, sexe: null
    };

    if (!nom || nom === "" || nom === " ") {
        error.nom = 'Le nom est réquis';
        valid = false;
    } else {
        error.nom = null;
    }
    if (!prenom || prenom === "" || prenom === " ") {
        error.prenom = 'Le prenom est réquis';
        valid = false;
    } else {
        error.prenom = null;
    }
    if (!sexe || sexe === "" || sexe === " ") {
        error.sexe = 'Ce champ est obligatoire';
        valid = false;
    } else {
        error.sexe = null;
    }
    if (email || email !== "") {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            error.email = 'Mauvais adresse mail';
            valid = false;
        } else {
            error.email = null;
        }
    }

    return { valid, error };
};

export const validateSignUp = (tel, email, nom, prenom, sexe, password, confirmPassword, conditionsAccepted) => {
    let valid = true;
    let error = {
        tel: null, email: null, nom: null, prenom: null, sexe: null, commune: null, ville: null, password: null, confirmPassword: null, consitions: false
    };

    if ((tel.match(/^\d{10}$/) && (tel.startsWith("09") || tel.startsWith("08"))) || (tel.match(/^\d{9}$/) && (tel.startsWith("9") || tel.startsWith("8")))) {
        error.tel = null;
    } else {
        error.tel = 'Verifiez votre numéro de téléphone';
        valid = false;
    }

    if (!nom || nom === "" || nom === " ") {
        error.nom = 'Le nom est réquis';
        valid = false;
    } else {
        error.nom = null;
    }
    if (!prenom || prenom === "" || prenom === " ") {
        error.prenom = 'Le prenom est réquis';
        valid = false;
    } else {
        error.prenom = null;
    }
    if (!sexe || sexe === "" || sexe === " ") {
        error.sexe = 'Ce champ est réquis';
        valid = false;
    } else {
        error.sexe = null;
    }
    if (email || email !== "") {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            error.email = 'Mauvais adresse mail';
            valid = false;
        } else {
            error.email = null;
        }
    }

    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(password))) {
        valid = false;
        error.password = 'Le mot de passe est réquis.';
    } else if (password !== confirmPassword) {
        valid = false;
        error.confirmPassword = 'Veuillez entrer le même mot de passe.';
    } else {
        error.password = null;
    }

    if (!conditionsAccepted) {
        valid = false;
        error.conditions = true;
    } else {
        error.conditions = false;
    }

    return { valid, error };
};

export const validateChangePassword = (password, confirmPassword) => {
    let valid = true;
    let error = {
        password: null, confirmPassword: null, consitions: false
    };

    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(password))) {
        valid = false;
        error.password = 'Le mot de passe est réquis.';
    } else if (password !== confirmPassword) {
        valid = false;
        error.confirmPassword = 'Veuillez entrer le même mot de passe.';
    } else {
        error.password = null;
    }

    return { valid, error };
};

export const validateUpdateUser = (user, tel, email, nom, prenom, sexe, ville, commune) => {
    let valid = true;
    let error = {
        update: true, tel: null, email: null, nom: null, prenom: null, sexe: null, commune: null, ville: null, password: null, confirmPassword: null, consitions: false
    };

    if ((tel.match(/^\d{10}$/) && (tel.startsWith("09") || tel.startsWith("08"))) || (tel.match(/^\d{9}$/) && (tel.startsWith("9") || tel.startsWith("8")))) {
        error.tel = null;
    } else {
        error.tel = 'Verifiez votre numéro de téléphone';
        valid = false;
    }

    if (!nom || nom === "" || nom === " ") {
        error.nom = 'Le nom est réquis';
        valid = false;
    } else {
        error.nom = null;
    }
    if (!prenom || prenom === "" || prenom === " ") {
        error.prenom = 'Le prenom est réquis';
        valid = false;
    } else {
        error.prenom = null;
    }
    if (!ville || ville === "" || ville === " ") {
        error.ville = 'La ville est réquis';
        valid = false;
    } else {
        error.ville = null;
    }
    if (!commune || commune === "" || commune === " ") {
        error.commune = 'La commune est réquis';
        valid = false;
    } else {
        error.commune = null;
    }
    if (!sexe || sexe === "" || sexe === " ") {
        error.sexe = 'Ce champ est réquis';
        valid = false;
    } else {
        error.sexe = null;
    }
    if (email || email !== "") {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            error.email = 'Mauvais adresse mail';
            valid = false;
        } else {
            error.email = null;
        }
    }

    return { valid, error };
};

export const passwordValidator = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(password);
};

export const passwordStrengthMesure = (password) => {
    let q = "";
    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(password))) {
        q = 'Mauvaise';
    }
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        q = 'Moyennement bonne';
    }
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{10,}$/.test(password)) {
        q = 'Bonne';
    }
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        q = 'Bonne';
    }
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/.test(password)) {
        q = 'Meilleure';
    }

    return q;
};