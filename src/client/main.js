import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import lightTheme from './Theme/light'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator, showSnackbar } from 'common-classes/SnackbarUtilsConfigurator'
import { store } from './store'
import { Provider as ReduxProvider } from 'react-redux'
import { globalHistory } from '@reach/router'
import { DrawerManager } from '@proista/client-ui-material/lib/Controls/Core/DrawerManager'
import { CatchError } from '@proista/client/lib/Controls/Core/CatchError'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { WithQuerySetGlobalOptions } from '@proista/client/lib/Tools/QueryHelper'
import { ah as RActions } from '@proista/client/lib/Data/Router/Types'
import { compose } from '@proista/client-tools/lib/index'
import { App } from './app'
import { InitMessageBus } from '@proista/client/lib/Tools/index'
import CssBaseline from '@material-ui/core/CssBaseline'
import _ from 'lodash'

// eslint-disable-next-line no-unused-vars
const busRef = InitMessageBus()

// set global catches for rest query errors
WithQuerySetGlobalOptions({
  onFRFailure: (fr) => {
    _.each(fr.Messages, (m) => {
      if (m.Type === 'Info') {
        showSnackbar.info(m.Message)
      } else if (m.Type === 'Warning') {
        showSnackbar.warning(m.Message)
      } else if (m.Type === 'Rule') {
        if (m.Field === '_error') {
          showSnackbar.error(m.Message)
        }
      } else if (m.Type !== 'Rule') {
        showSnackbar.error(m.Message)
      }
    })
  },
  onError: (err) => {
    showSnackbar.error((err || {}).message || 'Unexpected Error :(')
  }
})

class MainPlain extends React.Component {
  onRouteChanged = (history) => {
    const { RouterSetNewLocation } = this.props
    RouterSetNewLocation(history.location.pathname, history.location.search, history.location.hash)
  }

  componentDidMount () {
    this.historyUnsubscribe = globalHistory.listen(this.onRouteChanged)
    this.onRouteChanged(window)
  }

  componentWillUnmount () {
    this.historyUnsubscribe()
  }

  render () {
    return (
      <React.Fragment>
        <CatchError>
          <CssBaseline />
          <App />
          <DrawerManager />
        </CatchError>
      </React.Fragment>
    )
  }
}

const Main = compose(
  hot,
  WithRedux(
    [],
    [RActions.SetNewLocation]
  )
)(MainPlain)

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={lightTheme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}>
        <SnackbarUtilsConfigurator />
        <Main />
      </SnackbarProvider>
    </ThemeProvider>
  </ReduxProvider>
  , document.getElementById('content'))
