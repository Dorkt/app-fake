import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import User from '../../store/application/models/users/user'
import { IApplicationState } from '../../store'
import * as UserActions from '../../store/ducks/user/actions'
import { IPaginator, ISearch } from '../../store/ducks/root.types'

/* Importações do material-ui */
import { WithStyles, Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Papper from '@material-ui/core/Paper'

const StyledTableCell = withStyles((theme: Theme) => 
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 16,
        },
    }),
)(TableCell)

interface IState {
    readonly users: User[]
    readonly loading: boolean
    readonly success: boolean
    readonly error: boolean
    readonly paginator: any
}

interface IDispatchProps extends RouteComponentProps<any> {

    changePaginator(paginator: IPaginator): void

    /**
     * TODO A action tem que ser exatamente igual está no arquivo de actions
     */
    changeRemoveDialog(visibilityModal: boolean, userIdForRemove: string): void

    removeUserRequest(userIdForRemove: string): void

    loadUsersRequest(paginator: IPaginator): void

    changeDialog(dialog: boolean): void

    changeUser(user: User): void

    changeSearchPaginator(search: ISearch): void
}

type Props = IState & IDispatchProps

class ListAdmins extends Component<Props> {

    constructor(props: Props) {
        super(props)
        const { loadUsersRequest, paginator } = this.props
        loadUsersRequest(paginator)
    }

    public render() {
        const {
            users
        } = this.props
        return <div>
            {users.map((user) => {
                return <li>{user.first_name}</li>
            })}
        </div>
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    users: state.users.listUsers.users,
    success: state.users.listUsers.success,
    loading: state.users.listUsers.loading,
    paginator: state.users.listUsers.paginator,
    error: state.users.listUsers.error
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAdmins))