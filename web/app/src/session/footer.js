import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
require('../assets/roboto.css');

const styles = theme => ({
    footer: {
        background: '#004e66',
        width: '100%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        height: '30px',
        paddingTop: '10px'
    },
    footerUl: {
        paddingTop: '30px',
        display: 'inline',
        listStyleType: 'none',
        paddingRight: '20px',
        fontFamily: 'Roboto',
        fontSize: '12px',
        color: '#fff'
      },
      footerLi: {
        display: 'inline',
        paddingRight: '20px',
      },
      footLink: {
        color: '#fff',
        textDecoration: 'none'
      },    
});


  const Footer = ({ classes }) => (
    <div className={classes.footer}>
      <Grid container spacing={0} justify="flex-end" alignItems="center" direction="row" >
          <Grid item>
              <ul className={classes.footerUl}>
              <li className={classes.footerLi}><Link to="https://getpinged.io/about" className={classes.footLink}>About</Link></li>
              <li className={classes.footerLi}><Link to="https://getpinged.io/tos" className={classes.footLink}>Terms of Service</Link></li>
              <li className={classes.footerLi}><Link to="https://getpinged.io/privacy" className={classes.footLink}>Privacy</Link></li>
              <li className={classes.footerLi}><a href="mailto:support@getpinged.io" className={classes.footLink}>Support</a></li>
              </ul>
          </Grid>
      </Grid>
    </div>
)

export default withStyles(styles)(Footer)