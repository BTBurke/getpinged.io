import React from 'react'
import Link from 'gatsby-link'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Grid from 'material-ui/Grid'
import photo from './assets/me2.jpg'
import LinkedIn from 'mdi-material-ui/LinkedinBox'
import Github from 'mdi-material-ui/GithubBox'
import Twitter from 'mdi-material-ui/TwitterBox'

const styles = theme => ({
    about: {
        color: '#fff',
        marginTop: '30vh',
        marginBottom: '30vh'
    },
    picContainer: {
        margin: 10
    },
    pic: {
        height: '150px',
        width: '150px',
        flexGrow: 1,
        marginLeft: 'auto',
        marginBottom: '0 !important',
        '> img': {
            margin: 0
        }
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    },
    social: {
        height: 35,
        width: 35
    },
    text: {
        paddingTop: 20
    }
})

const About = ({classes}) => (
    <Grid container alignContent="center" justify="center" alignItems="flex-start" direction="row" spacing={12} className={classes.about}>
        <Grid item xs={12} md={2} className={classes.picContainer}>
            <Avatar alt="Bryan Burke" src={photo} className={classes.pic} />
        </Grid>
        <Grid item xs={12} md={7} className={classes.text}>
        I'm Bryan and I made this because I just wanted to keep track of some of my dependencies.  I don't want hundreds of notifications each day from Github.  I just want to know when a new release comes out and what changed.
        <p/><p/>
        Thanks for checking it out.  If you need anything, hit me up at <a href="mailto:bryan@getpinged.io" className={classes.link}>bryan@getpinged.io</a>.
        <p/><p/>
            <Grid container alignContent="center" justify="flex-start" alignItems="center" direction="row" spacing={12}>
                <Grid item>
                    <a className={classes.link} href="https://linkedin.com/in/bryanburke1"><LinkedIn className={classes.social} /></a>
                </Grid>
                <Grid item>
                    <a className={classes.link} href="https://github.com/BTBurke"><Github className={classes.social} /></a>
                </Grid>
                <Grid item>
                    <a className={classes.link} href="https://twitter.com/BryanBurke"><Twitter className={classes.social} /></a>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default withStyles(styles)(About)