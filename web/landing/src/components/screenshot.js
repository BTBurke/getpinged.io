import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Card, { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider'
import email from '../pages/assets/email.svg'
import roboto from '../pages/fonts/roboto.css'
import monitor  from '../pages/assets/heroicon-monitor-lg.svg'
import ticket from '../pages/assets/heroicon-ticket-lg.svg'
import award from '../pages/assets/heroicon-award-lg.svg'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import CheckCircle from 'material-ui-icons/CheckCircle'

const styles = theme => ({
    root: {
        marginTop: 0,
        width: '100%',
        background: '#e1eef6',
        minHeight: '250px',
        fontFamily: roboto,
      },
    headline: {
        marginTop: '50px',
    },
    headtext: {
        //color: '#3c6fa8',
        textAlign: 'center',
        margin: '0 5px 0 5px',
        fontFamily: 'Montserrat',
        fontWeight: 700,
    },
    features: {
        marginTop: '20px',
        marginRight: '20px',
        marginBottom: '40px'
    },
    feature: {
        minWidth: '275px',
        height: '100%',
        width: '100%,',
    },
    shot: {
        margin: '0 0 5px 0',
        minWidth: '100%',
    },
    icon: {
        height: '50px',
        margin: '0 0 5px 0',
    },
    nospacing: {
        margin: 0,
        padding: '0 !important',
        flexGrow: 1,
    },
    rule: {
        marginBottom: '20px',
        backgroundColor: '#ff5f2e',
        color: '#000',
        minHeight: '2px',
        minWidth: '200px',
        borderWidth: '0 2px 0 0',
        borderColor: '#ff5f2e'
    },
    checks: {
        fontSize: 50,
        color: '#ff5f2e',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'flex-start',
    }
})

const Screenshot = ({ classes }) => (
  <div className={classes.root}>
  <Grid container justify="center" alignItems="center" direction="column" spacing={24}>
    <Grid item xs={8}>
        <div className={classes.headline}>
            <Typography type="headline" className={classes.headtext}>
                All the data you need to determine the health of your dependencies at a glance, delivered right to your inbox
            </Typography>
        </div>
    </Grid>
    <Grid item xs={10} md={11}>
        <Grid container className={classes.features} justify="space-around" alignItems="stretch" direction="row" spacing={24}>
            <Grid item xs={12} md={4}>
                <Card className={classes.feature}>
                    <CardContent>
                        <img src={award} className={classes.icon} />
                        <Typography type="title">
                            Learn about new releases
                        </Typography>
                        <Typography type="body1">
                        Get an overview of pull requests, commits, and issues closed in new releases
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card className={classes.feature}>
                    <CardContent>
                        <img src={monitor} className={classes.icon} />
                        <Typography type="title">
                            Evaluate project health
                        </Typography>
                        <Typography type="body1">
                        Monitor project activity so you know when issues aren't being addressed
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card className={classes.feature}>
                    <CardContent>
                        <img src={ticket} className={classes.icon} />
                        <Typography type="title">
                            Engage on new issues
                        </Typography>
                        <Typography type="body1">
                            See a weekly rollup of new issues so you can make your voice heard
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Grid>
    <Divider className={classes.rule}/>
    <Grid container justify="center" alignItems="center" direction="row" spacing={0} className={classes.nospacing}>
        <Grid item xs={8} md={3} lg={4}>
            <div className={classes.headline}>
                <Typography type="headline" className={classes.headtext}>
                Get a personalized email like this every week
                </Typography>
            </div>
            <List className={classes.listContainer}>
                <ListItem>
                    <ListItemIcon>
                        <CheckCircle className={classes.checks}/>
                    </ListItemIcon>
                    <ListItemText primary="Just the stuff you need to know" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <CheckCircle className={classes.checks}/>
                    </ListItemIcon>
                    <ListItemText primary="Only the projects you want to follow" />
                </ListItem>
            </List>
        </Grid>
        <Grid item xs={12} md={8} lg={6} className={classes.nospacing}>
            <img src={email} className={classes.shot} />
        </Grid>
    </Grid>
</Grid>
  </div>
)

export default withStyles(styles)(Screenshot)