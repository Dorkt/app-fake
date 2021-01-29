import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import clsx from 'clsx'

/* Importações do material-ui */
/* TODO Colocar todas as importações juntas */
import { WithStyles, Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Papper from '@material-ui/core/Paper'
import { Container, Grid, Paper, TableRow } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

import User from '../../store/application/models/users/user'
import { IApplicationState } from '../../store'
import * as UserActions from '../../store/ducks/user/actions'
import { IPaginator, ISearch } from '../../store/ducks/root.types'

const Styles = (theme: Theme): any => createStyles({

    boxTable: {
        maxWidth: "100%"
    },

    tableColor: {
        backgroundColor: '#000000',
    },

    tableHead: {
        color: 'red',
        backgroundColor: "#000000",
    },

    tableCell: {
        textAlign: 'center'
    },
})




interface IState extends WithStyles<typeof Styles> {
    readonly users: User[]
    readonly loading: boolean
    readonly success: boolean
    readonly error: boolean
    readonly paginator: any
}

interface IDispatchProps extends RouteComponentProps<any> {

    changePaginator(paginator: IPaginator): void

    changeRemoveDialog(visibilityModal: boolean, userIdForRemove?: string): void

    removeUserRequest(userIdForRemove: string): void

    loadUsersRequest(paginator?: IPaginator): void

    changeUser(user: User): void
}

type Props = IState & IDispatchProps

class ListUsers extends Component<Props> {

    constructor(props: Props) {
        super(props)
        const { loadUsersRequest, paginator } = this.props
        loadUsersRequest(paginator)
    }

    public render() {
        const {
            users,
            classes
        } = this.props

        return (
            <Grid container={true}>
                <Grid item={true} xs={12} >
                    <TableContainer component={Paper} className={classes.container}>
                        <Table className={classes.boxTable}>
                            <TableHead className={classes.tableHead}>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>First name</TableCell>
                                    <TableCell className={classes.tableCell}>Last name</TableCell>
                                    <TableCell className={classes.tableCell}>Email Address</TableCell>
                                    <TableCell className={classes.tableCell}>Phone</TableCell>
                                    <TableCell className={classes.tableCell}>Street of Address</TableCell>
                                    <TableCell className={classes.tableCell}>Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user: User) => (
                                    <TableRow>
                                        <TableCell className={classes.tableCell}>{user.first_name}</TableCell>
                                        <TableCell className={classes.tableCell}>{user.last_name}</TableCell>
                                        <TableCell className={classes.tableCell}>{user.email}</TableCell>
                                        <TableCell className={classes.tableCell}>{user.phone}</TableCell>
                                        <TableCell className={classes.tableCell}>{user.address?.street}</TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <button>edit</button> 
                                            <button>delete</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableCell className={classes.tableCell}>

                            </TableCell>

                        </Table>

                    </TableContainer>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    users: state.users.listUsers.users,
    success: state.users.listUsers.success,
    loading: state.users.listUsers.loading,
    paginator: state.users.listUsers.paginator,
    error: state.users.listUsers.error
})

const UsersStyles = withStyles<any>(Styles, { withTheme: true })(ListUsers)

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersStyles))