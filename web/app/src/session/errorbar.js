import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import WarningIcon from 'material-ui-icons/Warning';

const styles = theme => ({
    errorBar: {
        background: '#f44336',
         minHeight: 60,
         marginTop: 0,
         paddingTop: 15
     },
     errBarText: {
         color: '#fff',
         wordWrap: 'break-word'
     },
     errBarBtn: {
         color: '#fff',
         '&:hover': {
             backgroundColor: '#e53935'
         },
         marginLeft: 50
     },
     errBarIcon: {
         color: '#ffc107',
         marginRight: 15
     }
});

const ErrorBar = ({ classes, msg, onCancel }) => (
    msg ? (
    <div className={classes.errorBar}>
        <Grid container spacing={0} justify="center" alignItems="center" direction="row">
            <Grid item alignSelf="center">
                <WarningIcon className={classes.errBarIcon} />
            </Grid>
            <Grid item alignSelf="center">
                <Typography type="body2" className={classes.errBarText}>{msg}</Typography>
            </Grid>
            <Grid item alignSelf="center">
                <Button onClick={onCancel} className={classes.errBarBtn}>Dismiss</Button>
            </Grid>
        </Grid>        
    </div> ) : null
)

export default withStyles(styles)(ErrorBar)