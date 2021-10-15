import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, Typography, IconButton, CircularProgress } from '@material-ui/core';
import { CloseSharp } from '@material-ui/icons';
import Modal from '../Modal';
import ArtisanCard from '../ArtisanCard';
import { useGetUrgentService } from '../../customeFunctionalities/data';

const DemandePrestationPannel = (props) => {
    const { open, handleClose } = props;

    const { services, loading } = useGetUrgentService();

    const classes = useStyles();
    return (
        <Modal
            open={open}
            handleClose={handleClose}
            contentContainerStyles={{ border: '1px solid rgb(0 0 0 / 58%)', padding: 0, overflow: 'hidden', overflowY: 'auto' }}
        >
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    <div className={classes.header}>
                        <Typography variant="h6" className={classes.title}>Trouver un technicien</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseSharp fontSize="small" />
                        </IconButton>
                    </div>
                    {loading ?
                        <CircularProgress /> :
                        <div className={classes.body}>
                            {services.length > 0 ?
                                <div className={classes.formContainer}>
                                    <Typography variant="body1" className={classes.question}>Quel technicien cherchez-vous ?</Typography>
                                    <div className={classes.artisanList}>
                                        {services.map((service) => (
                                            <Link to={`/urgence/${service.nom_service}`} key={service.id} className={classes.cardLink}>
                                                <ArtisanCard service={service} />
                                            </Link>
                                        ))}
                                    </div>
                                </div> :
                                <div>
                                    <Typography variant="h5" color="textSecondary" style={{ textAlign: 'center' }}>Pas de service disponible pour l'instant.</Typography>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </Modal>
    )
};

DemandePrestationPannel.propTypes = {
    open: Proptypes.bool.isRequired,
    handleClose: Proptypes.func.isRequired
}


const useStyles = makeStyles(theme => ({
    container: {
        minWidth: 500,
        minHeight: 380
    },
    innerContainer: {
        padding: 20,
        width: '100%',
        height: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 14,
    },
    body: {
        minHeight: '350px',
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    artisanList: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gap: 20,
        marginTop: 15,
    },
    [theme.breakpoints.down('sm')]: {
        container: {
            minWidth: '100vw',
            minHeight: '100vh',
            overflowY: 'auto',
            padding: '0 10px'
        },
        innerContainer: {
            padding: '30px 5px',
            height: '100vh'
        },
        artisanList: {
            gridTemplateColumns: '1fr 1fr',
            gap: 15
        },
        cardLink: {
            width: '100%',
            height: '100%',
            display: 'block',
        },
        body: {
            height: '95%',
        }
    },
    [theme.breakpoints.between('sm', 'md')]: {
        artisanList: {
            gridTemplateColumns: '1fr 1fr 1fr',
            marginTop: 30,
        }
    }
}));

export default DemandePrestationPannel;