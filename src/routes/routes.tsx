import React, { Suspense } from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Layout from '../containers/layout/layout'
import { CircularProgress } from '@material-ui/core'

interface PrivateRouteProps extends RouteProps {
    key?: number
    component?: any
    private?: boolean
    redirect?: string
    path?: string
    routes?: any
    userType?: string[]
    properties?: any[]
}

export const MenuRoutes = (route: PrivateRouteProps) => {
    return <Route
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props: RouteProps) => {

            if (route.redirect) {
                return (
                    <Redirect
                        to={{
                            pathname: `${route.redirect}`,
                            state: { from: props.location }
                        }}
                    />
                )
            }

            return (
                <route.component
                    {...props}
                    {...route.properties}
                    exact={true}
                    routes={route.routes}
                />
            )
        }}
    />
}

const routes = [
    { path: '/', exact: true, redirect: '/app' },
    {
        path: '/app',
        strict: true,
        private: true,
        component: Layout,
        routes: [
            {
                path: '/app/main',
                exact: true,
                private: true,
            }
        ]
    },
    {
        path: '/not_found',
        exact: true
    },
    {
        path: '/accessdenied',
        exact: true
    },
    {
        path: '*',
    }

]

class Routes extends React.Component<{ history: any }> {
    public render() {
        return (
            <ConnectedRouter history={this.props.history} >
                <Suspense fallback={<CircularProgress />}>
                    < Switch >
                        {
                            routes.map((route, i) => (
                                <MenuRoutes key={i} {...route} />
                            ))
                        }
                    </Switch>
                </Suspense>
            </ConnectedRouter>
        )
    }
}

export default Routes