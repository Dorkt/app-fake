import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import React, { Component } from 'react'
import { Provider } from 'react-redux';
import Routes from './routes/routes';
import store, { history } from './store';
import CONFIG_THEME from './material.theme'

class App extends Component {

  public render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={createMuiTheme(CONFIG_THEME)}>
          <CssBaseline />
          <Routes history={history} />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App;
