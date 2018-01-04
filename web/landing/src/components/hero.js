import React from 'react'
import Link from 'gatsby-link'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import roboto from '../pages/fonts/roboto.css'
import montserrat from '../pages/fonts/montserrat.css'
import Divider from 'material-ui/Divider'

const styles = theme => ({
  root: {
    margin: 'auto',
    marginTop: 0,
    width: '100%',
    background: '#004e66',
    minHeight: '250px',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: roboto,
  },
  headline: {
    marginTop: '35px',
    marginBottom: '55px',
    //maxWidth: '840px',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Montserrat',
    fontWeight: 700,
  },
  whiteText: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontWeight: 700,
  },
  actionButton: {
    background: '#ffad11',
    marginTop: '35px',
    '&:hover': {
      background: '#ff8513',
    },
  },
  tiny: {
    fontSize: '1rem',
    color: '#fff',
  },
  rule: {
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        backgroundColor: '#ff5f2e',
        color: '#000',
        minHeight: '2px',
        minWidth: '200px',
        maxWidth: '200px',
        borderWidth: '0 2px 0 0',
        borderColor: '#ff5f2e',
        
  }
})

const Hero = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.headline}>
      <Grid container justify="center" alignItems="center" direction="column" spacing={0}>
        <Grid item xs={12} md={10}>
            <Typography className={classes.whiteText} type="display2">Get a weekly email summarizing changes to the projects you follow</Typography>
            <Divider className={classes.rule} />
            <Typography className={classes.whiteText} type="title">Keeping up with your dependencies shouldn't be hard. We'll let you know when something significant happens.</Typography>
            <Button raised href="/page-2/" className={classes.actionButton}>Start following a project</Button>
            <Typography className={classes.whiteText} type="body1">It's free!</Typography>
        </Grid>
      </Grid>
    </div>
  </div>
)

export default withStyles(styles)(Hero)