import React from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import NavBar from './navbar';
import ErrorBar from './errorbar';
import Footer from './footer';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        paddingBottom: '40px',
        minHeight: '100%',
        background: '#eeeeee',
        width: '100%',
    }, 
});

class Projects extends React.Component {
    render() {
      return (
        <div>
          These are the projects
        </div>
      )
    }
  }
  
  class Search extends React.Component {
    render() {
      return (
        <div>
          These are the searches
        </div>
      )
    }
  }


class Session extends React.Component {
    state = {
        msg: undefined
    }

    cancelError = () => (
        this.setState({
            msg: undefined
        })
    )

    render() {

        const store = {};
        const { classes } = this.props;

        return (
        <div className={classes.root}>
            <NavBar />
            <ErrorBar msg={this.state.msg} onCancel={this.cancelError} />
            <Button onClick={() => this.setState({msg: 'test error msg but this one is much longer, lets see what happens'})}>Test Errors</Button>
            <Route exact path='/projects' render={props => (
            <Projects store={store} {...props} />
            )} />
            <Route exact path='/search' render={props => (
            <Search store={store} {...props} />
            )} />
            <Footer />
        </div>
        )
    }
}

export default withStyles(styles)(Session);