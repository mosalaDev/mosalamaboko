import React, { useState, useEffect, useRef } from 'react';
import './reservation.css';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles, useMediaQuery, useTheme, IconButton, Typography, Button, FormGroup, FormControlLabel, Radio, Checkbox, CircularProgress, LinearProgress } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Close, ChevronRightSharp, ChevronLeftSharp } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { AppMessageModal, CustomeModal as Modal } from '../../components';
import Select from '../../components/Inputs/Select';
import TextInput from '../../components/Inputs/TextInput';
import Switch from '../../components/Inputs/switch';
import { DatePicker } from '../../components/Inputs/DateTimePicker';
import { communes, useGetServices } from '../../customeFunctionalities/data';

import { selectAll as selectAllZones } from '../../redux/reducers/zones';
import { getUser } from '../../redux/reducers/user';
import axios from '../../config/axios';
import { validateService, validateAddress, validateWorks, validateDateAndTime, validateUserCoords } from '../../customeFunctionalities/validators';
import { getLocation } from '../../customeFunctionalities/helpers';

import moment from 'moment';

const UpdateReservation = ({ reservation }) => {
    const history = useHistory();
    const user = useSelector(getUser);
    const [step, setStep] = useState(0);
    const [selectedService, setSelectedService] = useState(reservation ? reservation.service : '');
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
    const [nom, setNom] = useState(user ? user.nom : '');
    const [prenom, setPrenom] = useState(user ? user.prenom : '');
    const [sexe, setSex] = useState(user ? user.sexe : '');
    const [tel, setTel] = useState(user ? user.tel : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [allowLocation, setAllowLocation] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [category, setCategory] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
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

    const handleClose = () => { };

    const classes = useStyles();
    return (
        <Modal open={true} handleClose={handleClose} contentContainerStyles={{ padding: 0 }}>
            <div className={classes.container}>

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
        border: '1px solid #eaeaea',
        borderRadius: 5,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflowX: 'hidden'
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
        }
    },
}))

export default Reservation;
