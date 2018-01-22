import React from 'react';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import List, {ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import FolderIcon from 'material-ui-icons/Folder';
import SearchIcon from 'material-ui-icons/Search';
import AccountIcon from 'material-ui-icons/AccountCircle';
import logo from '../assets/icon.svg';
import Button from 'material-ui/Button';

require('../assets/orbitron.css');

const styles = theme => ({
    hamburger: {
        '@media screen and (min-width: 587px)': {
            display: 'none'
        }
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    list: {
        minWidth: 250
    },
    logo: {
        width: 65,
        height: 65,
        '@media screen and (max-width: 587px)': {
            marginLeft: 'auto'
        }
    },
    bar: {
        backgroundColor: '#004e66'
    },
    logotext: {
        fontFamily: 'Orbitron',
        marginLeft: 20,
        fontSize: '35px',
        fontStyle: 'italic',
        marginTop: 10
    },
    btn: {
        marginLeft: 'auto',
        '@media screen and (max-width: 587px)': {
            display: 'none'
        }
    },
    btnH: {
        '@media screen and (max-width: 587px)': {
            display: 'none'
        }
    }
});


class NavBar extends React.Component {
    state = {
        open: false
    }

    toggleDrawer = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { classes } = this.props;
        const sidelist = (
            <div className={classes.list}>
                <List>
                    <ListItem button component="a" href="/projects">
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItem>
                    <ListItem button component="a" href="/search">
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Search" />
                    </ListItem>
                    <ListItem button component="a" href="/account">
                        <ListItemIcon>
                            <AccountIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItem>
                </List>
            </div>
        )

        return (
            <div>
                <Drawer anchor="top" open={this.state.open} onClose={this.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        {sidelist}
                    </div>
                </Drawer>
                <AppBar position="static" className={classes.bar}>
                    <ToolBar>
                        <IconButton onClick={this.toggleDrawer} className={classes.hamburger} color="contrast" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <img src={logo} alt="logo" className={classes.logo} />
                        <div className={classes.logotext}>pinged</div>
                        <Button color="contrast" href="/projects" className={classes.btn}>Projects</Button>
                        <Button color="contrast" href="/search" className={classes.btnH}>Search</Button>
                        <Button color="contrast" href="/account" className={classes.btnH}>Account</Button>
                    </ToolBar>
                </AppBar>
            </div>
        );

    }
}

export default withStyles(styles)(NavBar);