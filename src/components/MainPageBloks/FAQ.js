import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { frequentQuestions } from '../../customeFunctionalities/data';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        color: '#444'
    },
    accordion: {
        "&:not(:first-child)": {
            boxShadow: '1px 0px 0px 0px #eaeaea, -1px 1px 0px 0px #eaeaea, 0px 0px 0px 0px #eaeaea!important',
            marginTop: 10
        },
        "&:first-child": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            boxShadow: '1px 0px 0px 0px #eaeaea, -1px 1px 0px 0px #eaeaea, 0px -1px 0px 0px #eaeaea!important',
        },
        "&:last-child": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: '1px 0px 0px 0px #eaeaea, -1px 1px 0px 0px #eaeaea, 0px -1px 0px 0px #eaeaea!important',
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(23),
        fontWeight: theme.typography.fontWeightRegular,
        color: 'rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    buttonBase: {
        "& > div": {
            overflow: 'hidden'
        }
    },
    paragraphContainer: {
        flexDirection: 'column!important',
    },
    paragraph: {
        textAlign: 'justify',
        "&:not(:last-child)": {
            marginBottom: 10,
        }
    },
    header: {
        textAlign: 'center',
        marginBottom: 20
    },
    title: {
        color: '#283d71',
        fontWeight: '400!important',
    },
    questions: {
        maxWidth: 700,
        margin: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
        heading: {
            fontSize: '17px!important',
        },
        accordion: {
            "&:not(:first-child)": {
                boxShadow: '1px 0px 0px 0px #eaeaea, -1px 1px 0px 0px #eaeaea, 0px 0px 0px 0px #eaeaea!important',
                marginTop: 7
            }
        }
    }
}));

export default function FAQ() {
    const [expanded, setExpanded] = React.useState(false);

    const handleOnChage = (value) => (event, isExpanded) => {
        setExpanded(isExpanded ? value : false);
    };

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className="inner-content">
                <div className={classes.content}></div>
                <div className={classes.header}>
                    <Typography variant="h5" className={`${classes.title} big-title`}>Foire aux questions</Typography>
                </div>
                <div className={classes.questions}>
                    {frequentQuestions.map((question, index) => (
                        <Accordion expanded={question.q === expanded} onChange={handleOnChage(question.q)} key={`${question.q}_${index}`} className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.buttonBase}
                            >
                                <Typography className={classes.heading}>{question.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails className={classes.paragraphContainer}>
                                {question.r.map((p, index) => (
                                    <Typography key={`${p}${index}`} className={classes.paragraph}>{p}</Typography>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
}