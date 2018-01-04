import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Grid from 'material-ui/Grid';
import ReactSVG from 'react-svg';
import logo from '../pages/assets/logo.svg';


import './index.css'
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import indigo from 'material-ui/colors/indigo';
import green from 'material-ui/colors/green';
require('typeface-roboto');
import orbitron from '../pages/fonts/orbitron.css';

const styles = theme => ({
  root: {
    marginTop: 0,
    background: '#004e66',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  logo: {
    marginLeft: 0,
    marginRight: 20,
    height: '65px',
    marginTop: '5px',
  },
  logoText: {
    fontWeight: 900,
    color: '#fff',
    fontStyle: 'italic',
    fontSize: '34px',
    fontFamily: 'Orbitron',
    paddingTop: '0px',
  },
  hideMobile: {
    '@media screen and (max-width: 584px)': {
      display: 'none',
    },
  },
  toolbar: {
    width: '100%',
  },
  global: {
    'overflow-x': 'hidden',
  }
});



const TemplateWrapper = ({ children, classes }) => (
  <div className="classes.global">
    <Helmet
      title="Pinged | Get updates on your favorite projects"
      meta={[
        { name: 'description', content: 'Track changes to your favorite projects via a weekly email' },
        { name: 'keywords', content: 'dependency tracking, project tracking, software development' },
      ]}
    />
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} className={classes.logo}/>
          <Typography type="title" color="inherit" className={classes.flex}>
            <span className={classes.logoText}>pinged</span>
          </Typography>
          <Button color="contrast">Sign Up</Button>
          <Button color="contrast" className={classes.hideMobile}>Login</Button>
        </Toolbar>
      </Grid>
      {children()}
    </div>
  </div>
);


TemplateWrapper.propTypes = {
  children: PropTypes.func,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TemplateWrapper)
