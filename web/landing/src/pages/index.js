import React from 'react'
import Link from 'gatsby-link'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import roboto from './fonts/roboto.css'


const styles = theme => ({
  root: {
    marginTop: 0,
    width: '100%',
    background: '#03A9F4',
    minHeight: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: roboto,
  },
  headline: {
    marginTop: '35px',
    marginBottom: '55px',
    maxWidth: '840px',
    textAlign: 'center',
  },
  whiteText: {
    color: '#fff',
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

const IndexPage = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.headline}>
      <Typography className={classes.whiteText} type="display2">Get a weekly email with the latest updates to your dependencies</Typography>
      <Button raised href="/page-2/" className={classes.actionButton}>Start following a project</Button>
      <Typography className={classes.whiteText} type="body1">It's free!</Typography>
    </div>
  </div>
)

export default withStyles(styles)(IndexPage)
