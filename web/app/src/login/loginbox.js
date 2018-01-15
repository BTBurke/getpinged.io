import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    input: {
        width: '100%',
        margin: 10,
    },
    textFieldRoot: {
        padding: 0,
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
    },
    textFieldInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
    textFieldFormLabel: {
        fontSize: 18,
    },
    submit: {
        minWidth: 200,
        backgroundColor: '#ffad11',
        margin: 'auto',
        marginTop: 10,
        '&:hover': {
            backgroundColor: '#ffad11'
        }
    }
});

class LoginBox extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = event => {
        cookies.save("pinged", "test");
        console.log("submit", this.state.email, this.state.password);
        this.props.onSuccess();
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                    id="email"
                    label="Email Address"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    className={classes.input}
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.textFieldFormLabel,
                    }}

                />
                <TextField
                    id="password"
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    type="password"
                    margin="normal"
                    className={classes.input}
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.textFieldFormLabel,
                    }}
                />
                <Button raised className={classes.submit} onClick={this.handleSubmit}>
                    Login
                </Button>
            </form>
        )
    }
}

class SignupBox extends React.Component {
    state = {
        email: '',
        password: '',
        password2: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = event => {
        console.log("create", this.state.email, this.state.password);
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                    id="suemail"
                    label="Email Address"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    className={classes.input}
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.textFieldFormLabel,
                    }}

                />
                <TextField
                    id="supassword"
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    type="password"
                    margin="normal"
                    className={classes.input}
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.textFieldFormLabel,
                    }}
                />
                <TextField
                    id="supassword2"
                    label="Type Password Again"
                    value={this.state.password2}
                    onChange={this.handleChange('password2')}
                    type="password"
                    margin="normal"
                    className={classes.input}
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                        },
                    }}
                    error={this.state.password !== this.state.password2}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.textFieldFormLabel,
                    }}
                />
                <Button raised className={classes.submit} onClick={this.handleSubmit}>
                    Create Account
                </Button>
            </form>
        )
    }
}

const LoginBoxE = withStyles(styles)(LoginBox);
const SignupBoxE = withStyles(styles)(SignupBox);

export { LoginBoxE as LoginBox, SignupBoxE as SignupBox };