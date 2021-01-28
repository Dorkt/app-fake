import React, { Component } from 'react'
import clsx from 'clsx';
import {
    Theme, createStyles, WithStyles,
    AppBar, Toolbar,
    IconButton, Typography, Drawer, Divider, List, ListItemIcon, ListItem, ListItemText, withStyles, CssBaseline
} from '@material-ui/core';
import { ChevronLeft, Inbox, Mail, Menu as MenuIcon } from '@material-ui/icons'
import { RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { IApplicationState } from '../../store'
import { MenuRoutes } from '../../routes/routes'

import * as LayoutActions from '../../store/ducks/layout/actions'

const drawerWidth = 240;

const Styles = (theme: Theme): any => createStyles({
    root: {},
    displayFlex: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0
    }
})

interface IState extends WithStyles<typeof Styles> {
    readonly email: string
}

interface IDispatchProps extends RouteComponentProps<any> {
    changeEmail(data: string): void
}

interface IOwnProps {
    routes: []
}

type Props = IDispatchProps & IOwnProps & IState

class Layout extends Component<Props, { drawer: boolean }> {

    constructor(props: Props) {
        super(props);

        this.state = {
            drawer: false
        }

        this.handleDrawer = this.handleDrawer.bind(this)
    }

    public handleDrawer(): void {
        this.setState({ drawer: !this.state.drawer })
    }

    public render() {

        const {
            classes,
            email,
            changeEmail,
            history,
            match,
            location,
        } = this.props

        return (
            <div className={classes.displayFlex}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes?.appBarShift]: this.state.drawer,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => this.setState({ drawer: true })}
                            edge="start"
                            className={clsx(classes?.menuButton, this.state.drawer && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Lista de usuários
                  </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes?.drawerHeader}>
                        <IconButton onClick={() => this.setState({ drawer: false })}>
                            <ChevronLeft />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts']?.map((text, index) => (
                            <ListItem button={true} key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam']?.map((text, index) => (
                            <ListItem button={true} key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.drawer,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Switch>
                        {
                            this.props.routes?.map((route: any, i: number) => (
                                <MenuRoutes key={i} {...route} />
                            ))
                        }
                    </Switch>
                </main>
            </div >
        );
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    email: state.layout.email
})


const LayoutStyles = withStyles<any>(Styles, { withTheme: true })(Layout)

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(LayoutActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutStyles))