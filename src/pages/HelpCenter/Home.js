import React, {useEffect} from 'react';
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';
import TextInput from '../../components/Inputs/TextInput';
import { frequentQuestions, questions } from '../../customeFunctionalities/data';
import { Link, useRouteMatch } from 'react-router-dom';
import ReactGA from 'react-ga';

export default function HelpCenter() {
    const { url } = useRouteMatch();
    const classes = useStyles();

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])
    return (
        <div className="page-root">
            <div className={classes.header}>
                <div className={classes.headerContent}>
                    <Typography className="big-title" variant="h5" style={{ fontWeight: 500 }}>Foire aux questions</Typography>
                    <TextInput
                        placeholder="Que voulez-vous savoir ?"
                        fullWidth={true}
                        style={{ width: '100%', marginTop: 20 }}
                        InputProps={{ className: classes.input }}
                    />
                </div>
            </div>
            <div className={classes.body}>
                <div className={classes.section}>
                    <Typography className={classes.sectionTitle}>Questions les plus posées</Typography>
                    <ul className="horizontal-list" style={{ marginTop: 20, flexWrap: 'wrap' }}>
                        {frequentQuestions.filter((q, i) => i < 3).map((question, index) => (
                            <li key={index} className={classes.fQuestion}>
                                <Link to={`/${question.q}`}>{question.q}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={clsx('horizontal-list', classes.section, classes.groups)}>
                    {questions.map((group) => (
                        <div className={classes.qGroup}>
                            <Typography className={classes.groupTitle}>{group.label}</Typography>
                            <ul className="vertical-list">
                                {group.list.map((q) => (
                                    <li>
                                        <Link to={`${url}/${q.l}`}>{q.q}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.footer}>
                <div className={clsx("align-start-flex-row-content")}>
                    <Typography className={classes.contactText}>Pour d'autres questions écrivez-nous au -------------</Typography>
                </div>
                <div>
                    <Typography style={{ fontSize: 15, textAlign: 'center' }}>© Gifted Hands Technology. Tous droits reservés</Typography>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    header: {
        padding: '50px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #eaeaea',
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 500,
    },
    input: {
        backgroundColor: '#fff',
        fontSize: 20
    },
    body: {
        backgroundColor: '#fff',
        padding: '30px 30px',
        "& a": {
            transition: 'color .2s'
        },
        "& a:hover": {
            color: theme.palette.primary.main,
            textDecoration: 'underline'
        }
    },
    fQuestion: {
        backgroundColor: '#fff',
        boxShadow: '0 1px 16px rgb(0 0 0 / 10%)',
        width: '32%',
        minWidth: '100px',
        alignSelf: 'stretch',
        "&:not(:last-child)": {
            marginRight: 15
        },
        "& > a": {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 15px',
            fontSize: 18,
            fontWeight: 500,
            width: '100%',
        }
    },
    section: {
        padding: '30px 0',
    },
    sectionTitle: {
        fontSize: 22,
    },
    groups: {
        alignItems: 'baseline',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    groupTitle: {
        fontSize: 17,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    qGroup: {
        maxWidth: 300,
        width: '22%',
        "& > .vertical-list > *:not(:last-child)": {
            marginBottom: 20,
            fontSize: 17,
            color: '#333'
        }
    },
    footer: {
        borderTop: '1px solid #eaeaea',
        "& > div": {
            padding: '20px 30px',
        }
    },
    contactText: {
        fontSize: 22,
    }
}));