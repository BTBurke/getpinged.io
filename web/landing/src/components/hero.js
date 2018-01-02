import React from 'react'
import Link from 'gatsby-link'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import roboto from '../pages/fonts/roboto.css'
import montserrat from '../pages/fonts/montserrat.css'

const styles = theme => ({
  root: {
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
    width: '80%',
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
  }
})

const Hero = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.headline}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography className={classes.whiteText} type="display2">Get a weekly email with the latest updates to your dependencies</Typography>
          <Button raised href="/page-2/" className={classes.actionButton}>Start following a project</Button>
          <Typography className={classes.whiteText} type="body1">It's free!</Typography>
        </Grid>
      </Grid>
    </div>
  </div>
)

export default withStyles(styles)(Hero)