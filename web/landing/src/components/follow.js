import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Input, { InputLabel } from 'material-ui/Input'
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import roboto from '../pages/fonts/roboto.css'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

const styles = theme => ({
    root: {
        marginTop: '0px',
        width: '100%',
        background: '#e3eef0',
        minHeight: '250px',
        fontFamily: roboto,
      },
      headtext: {
        marginTop: '50px',
        textAlign: 'center',
      },
      inputLabelFocused: {
        color: '#ffad11',
      },
      inputInkbar: {
        '&:after': {
          backgroundColor: '#ffad11',
        },
      },
      textFieldRoot: {
        padding: 0,
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
      },
      textFieldInput: {
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #ffad11',
        fontSize: 16,
        padding: '10px 12px',
        width: '100%',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
          borderColor: '#ffad11',
          boxShadow: '0 0 0 0.2rem #ffad11',
        },
      },
      textFieldFormLabel: {
        fontSize: 18,
      },
      form: {
          width: '100%',
          flexGrow: 1,
      }
})



class Follow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }
    }

    handleClick(name) {
        const selected = this.state.selected.filter((proj) => {
            return name === proj
        }).length > 0
        if (selected) {
            this.setState({selected: this.state.selected.filter((proj) => {
                return name !== proj
            })})
        } else { 
            this.setState({selected: this.state.selected.concat(name)});
        }    
    }

    searchChange(e) {
        e.preventDefault()
        console.log(this.refs.test)
        console.log("got: ", e.target.target)
    }

    render(props) {
        const {classes} = this.props
        
        const projects = [
            'facebook/react',
            'rustlang/rust',
            'google/golang',
            'facebook/redux',
            'vuejs/vue',
            'myproj/something',
        ]; 
    
        return (
        <div className={classes.root}>
        <Grid container justify="center" alignItems="center" direction="column" spacing={24}>
            <Grid item>
                <Typography type="headline" className={classes.headtext}>
                    Not sure what to follow? Why not start with some of these great projects?
                </Typography>
            </Grid>
            <Grid item>
                <Grid container justify="center" direction="row" alignItems="center" spacing={8}>
                {
                    projects.map((proj) => {
                        let selected = this.state.selected.filter((name) => {
                                    return name === proj
                                }).length > 0
                        return (
                        <Grid item key={proj}>
                            <Chip
                            avatar={<Avatar>{selected ? 'C' : '+'}
                                </Avatar>}
                            label={proj}
                            style={selected ? {background: '#ffad11'} : null}
                            onClick={() => this.handleClick(proj)}
                            />
                        </Grid>
                        )}
                    )
                }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="column" justify="center" alignItems="stretch">
                <Grid item>
                <form onSubmit={(e) => this.searchChange(e)}>
                    <FormControl className={classes.form}>
                        <InputLabel
                        FormControlClasses={{
                            focused: classes.inputLabelFocused,
                        }}
                        htmlFor="custom-color-input"
                        >
                        Or search for a project (e.g., mojombo/jekyll)
                        </InputLabel>
                        <Input
                        classes={{
                            inkbar: classes.inputInkbar,
                        }}
                        id="searchvalue"
                        ref="test"
                        />
                    </FormControl>
                </form>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
        </div>
        );
    }
}

export default withStyles(styles)(Follow)