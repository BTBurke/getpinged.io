import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Tabs, {Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Grid from 'material-ui/Grid';
import { LoginBox, SignupBox } from './loginbox';
import logo from '../assets/icon.svg';
import { Redirect, withRouter } from 'react-router-dom';
import cookie from 'react-cookies';

const styles = theme => ({
    root: {
        backgroundColor: '#004e66',
        minHeight: '100vh',
        flexGrow: 1,
    },
    box: {
        backgroundColor: '#e1eef6',
        maxWidth: '500px',
    },
    logo: {
        fontFamily: 'Orbitron',
        fontSize: '34px',
        fontStyle: 'italic',
        color: '#fff',
        position: 'absolute',
        top: 0,
        left: 20,
        display: 'flex',
        flexDirection: 'row',
        align: 'center'
    },
    logoimg: {
        height: 65,
        width: 65,
        marginTop: 0,
    },
    logotext: {
        marginTop: 25,
        height: 65,
        marginLeft: 10,
    },
    error: {
        backgroundColor: 'rgba(255, 95, 46, 0.3)',
        textAlign: 'center',
        color: '#000'
    }
});

function TabContainer({ children, dir }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
}

const ErrorMsg = ({ msg, classes }) => (
    msg !== undefined ? (
        <div className={classes.error}>
            {msg}
        </div>
    ) : null
)

class Login extends React.Component {

    state = {
        value: this.props.location.pathname === '/login' || this.props.location.pathname === '/' ? 1 : 0,
        redirectToReferrer: false,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ index });
    };

    handleSuccess = () => {
        console.log("success");
        this.setState({
            redirectToReferrer: true
        });
    };

    isLoggedIn = () => {
        return cookie.load("pinged") !== undefined
    }

    render() {
        const { classes, theme } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/projects' } }
        const { redirectToReferrer } = this.state
        const { errorMsg } = this.props.location.state || ""
        console.log('state', this.state)
        
        if (redirectToReferrer || this.isLoggedIn()) {
            window.location.replace(from.pathname)
        }

        return (
            
            <Grid container direction="row" justify="center" alignItems="center" spacing={0} className={classes.root}>
                <div className={classes.logo}>
                    <div className={classes.logoimg}>
                        <img src={logo} className={classes.logoimg} alt="logo" />
                    </div>
                    <div className={classes.logotext}>
                        pinged
                    </div>
                </div>
                <Grid item className={classes.box} xs={11}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="#ff5f2e"
                            textColor="inherit"
                            fullWidth
                        >
                            <Tab label="Sign up" />
                            <Tab label="Login" />
                        </Tabs>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer dir={theme.direction}>
                                <SignupBox onSuccess={this.handleSuccess} />
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <ErrorMsg msg={errorMsg} {...this.props} />
                                <LoginBox onSuccess={this.handleSuccess} />
                            </TabContainer>
                        </SwipeableViews>
                    </AppBar>
                </Grid>
            </Grid>
            
        );
    }
}

export default withStyles(styles, {withTheme: true})(Login);
