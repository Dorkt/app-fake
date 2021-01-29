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
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, TableRow, TextField } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

import User from '../../store/application/models/users/user'
import { IApplicationState } from '../../store'
import * as UserActions from '../../store/ducks/user/actions'
import { IPaginator, ISearch } from '../../store/ducks/root.types'
import { Delete, Create } from '@material-ui/icons'

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
    flexButton: {
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center'
    }
})

interface IState extends WithStyles<typeof Styles> {
    readonly users: User[]
    readonly loading: boolean
    readonly success: boolean
    readonly error: boolean
    readonly paginator: any

    readonly visibilityDialog: boolean
    readonly visibiltyModal: boolean
    readonly idForRemove: string
    readonly removeLoading: boolean
    readonly removeSuccess: boolean
    readonly removeError: boolean
}

interface IDispatchProps extends RouteComponentProps<any> {

    changePaginator(paginator: IPaginator): void

    changeRemoveDialog(visibilityModal: boolean, userIdForRemove?: string): void

    removeUserRequest(userIdForRemove?: string): void

    loadUsersRequest(paginator?: IPaginator): void

    changeUser(user: User): void
}

type Props = IState & IDispatchProps

class ListUsers extends Component<Props, { userId?: string }> {

    constructor(props: Props) {
        super(props)
        const { loadUsersRequest, paginator } = this.props
        loadUsersRequest(paginator)

        this.state = {
            userId: ''
        }
    }

    public render() {

        const {
            users,
            classes,
            visibiltyModal,
            changeRemoveDialog,
            removeUserRequest
        } = this.props

        return (
            <React.Fragment>
                {/* TODO Finalizar em casa */}
                    <div className={classes.root}>
                        <div>
                            <TextField
                                label="With normal TextField"
                                id="standard-start-adornment"
                                className={clsx(classes.margin, classes.textField)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                                }}
                            />
                            <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                                <Input
                                    id="standard-adornment-weight"
                                    value={values.weight}
                                    onChange={handleChange('weight')}
                                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                                <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
                            </FormControl>
                            <FormControl className={clsx(classes.margin, classes.textField)}>
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    value={values.amount}
                                    onChange={handleChange('amount')}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl>
                        </div>
                    </div>


                        {/* componente de dialog */}
                        <Dialog
                            open={visibiltyModal}
                        >
                            <DialogTitle id="responsive-dialog-title">Remover usuário</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Tem certeza que deseja remover usuário?
                        </DialogContentText>
                            </DialogContent>
                            <DialogActions className={classes.flexButton}>
                                <Button onClick={() => changeRemoveDialog(!visibiltyModal)} color="primary">
                                    Cancelar
                        </Button>
                                <Button onClick={() => {
                                    changeRemoveDialog(!visibiltyModal)
                                    return removeUserRequest(this.state.userId)
                                }} color="secondary" >
                                    Sim
                        </Button>
                            </DialogActions>
                        </Dialog>

                        {/* TODO Dialog update */}

                        <Grid container={true}>
                            <Grid item={true} xs={12} >
                                <TableContainer component={Paper} className={classes.container}>
                                    <Table className={classes.boxTable}>
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>#</TableCell>
                                                <TableCell className={classes.tableCell}>First name</TableCell>
                                                <TableCell className={classes.tableCell}>Last name</TableCell>
                                                <TableCell className={classes.tableCell}>Email Address</TableCell>
                                                <TableCell className={classes.tableCell}>Phone</TableCell>
                                                <TableCell className={classes.tableCell}>Street of Address</TableCell>
                                                <TableCell className={classes.tableCell}>Options</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user: User, index: number) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className={classes.tableCell}>{index + 1}</TableCell>
                                                    <TableCell className={classes.tableCell}>{user.first_name}</TableCell>
                                                    <TableCell className={classes.tableCell}>{user.last_name}</TableCell>
                                                    <TableCell className={classes.tableCell}>{user.email}</TableCell>
                                                    <TableCell className={classes.tableCell}>{user.phone}</TableCell>
                                                    <TableCell className={classes.tableCell}>{user.address?.street}</TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <IconButton onClick={(e) => {
                                                            this.setState({ userId: user?.id })
                                                            return changeRemoveDialog(!visibiltyModal, user?.id)
                                                        }} aria-label="edit">
                                                            <Create />
                                                        </IconButton>

                                                        <IconButton onClick={(e) => {
                                                            this.setState({ userId: user?.id })
                                                            return changeRemoveDialog(!visibiltyModal, user?.id)
                                                        }} aria-label="delete">
                                                            <Delete />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </TableContainer>
                                {/* TODO Pagination */}
                            </Grid>
                        </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IApplicationState) => ({
                        users: state.users.listUsers.users,
    success: state.users.listUsers.success,
    loading: state.users.listUsers.loading,
    paginator: state.users.listUsers.paginator,
    error: state.users.listUsers.error,

    visibiltyModal: state.users.removeUser.visibilityModal,
    idForRemove: state.users.removeUser.userIdForRemove,
    removeLoading: state.users.removeUser.loading,
    removeSuccess: state.users.removeUser.success,
    removeError: state.users.removeUser.error
})

const UsersStyles = withStyles<any>(Styles, {withTheme: true })(ListUsers)

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({...UserActions}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersStyles))