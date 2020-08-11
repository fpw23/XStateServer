import { createStore, compose, combineReducers } from 'redux'
import { RegisterStates, RegisterActions } from '@proista/client-data/lib/DataManager'

// App State
import AppStateReducer from '@proista/client-data/lib/AppState/Reducers'
import AppStateActionList from '@proista/client-data/lib/AppState/Actions'
import AppStateStateList from '@proista/client-data/lib/AppState/State'

// Forms
import FormReducer from '@proista/client/lib/Data/Form/Reducers'
import FormActionList from '@proista/client/lib/Data/Form/Actions'
import FormStateList from '@proista/client/lib/Data/Form/State'

// Drawers
import DrawerReducer from '@proista/client-ui-material/lib/Data/Drawer/Reducers'
import DrawerActionList from '@proista/client-ui-material/lib/Data/Drawer/Actions'
import DrawerStateList from '@proista/client-ui-material/lib/Data/Drawer/State'

// Router
import RouterReducer from '@proista/client/lib/Data/Router/Reducers'
import RouterActionList from '@proista/client/lib/Data/Router/Actions'
import RouterStateList from '@proista/client/lib/Data/Router/State'

RegisterActions(AppStateActionList)
RegisterActions(FormActionList)
RegisterActions(DrawerActionList)
RegisterActions(RouterActionList)

RegisterStates(AppStateStateList)
RegisterStates(FormStateList)
RegisterStates(DrawerStateList)
RegisterStates(RouterStateList)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  combineReducers({
    AppState: AppStateReducer,
    Drawer: DrawerReducer,
    Router: RouterReducer,
    form: FormReducer
  }),
  composeEnhancers()
)

export default store
