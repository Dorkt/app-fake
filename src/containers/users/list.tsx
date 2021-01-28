import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import User from '../../store/application/models/users/user'
import { IApplicationState } from '../../store'
import * as UserActions from '../../store/ducks/user/actions'
import { IPaginator, ISearch } from '../../store/ducks/root.types'

interface IState {
    readonly users: User[]
    readonly loading: boolean
    readonly success: boolean
    readonly error: boolean
    readonly paginator: any
}

interface IDispatchProps extends RouteComponentProps<any> {

    changePaginator(paginator: IPaginator): void

    changeRemoveDialog(visibilityModal: boolean, userIdForRemove: string): void

    removeUserRequest(userIdForRemove: string): void

    loadUsersRequest(paginator: IPaginator): void

    changeDialog(dialog: boolean): void

    changeUser(user: User): void

    changeSearchPaginator(search: ISearch): void
}

type Props = IState & IDispatchProps

class ListAdmins extends Component<Props> {

    public render() {
        const {
            users,
            loading,
            error,
            paginator,
            changePaginator,
            removeUserRequest,
            loadUsersRequest,
            history,
            location,
            match,
            changeUser,
            changeRemoveDialog,
        } = this.props

        return <div />
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