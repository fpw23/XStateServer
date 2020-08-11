import React from 'react'
import { compose } from '@proista/client-tools/lib/index'
import { UnknownRoute, IndexRoute } from '@proista/client/lib/Controls/Core/index'
import { ah as RActions } from '@proista/client/lib/Data/Router/Types'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { Router } from '@reach/router'
import { withStyles } from '@material-ui/core'
import { Details } from './Details'
import { List } from './List'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class RootPlain extends React.Component {
  render () {
    const { navigate, classes } = this.props
    const rootProps = {
      navigate,
      rootClasses: classes
    }

    return <Router>
      <IndexRoute path='/' to='./Find' />
      <List path='Find' {...rootProps} />
      <Details path='Find/:TaskId/Details' {...rootProps} BackURL='../..' />
      <UnknownRoute default />
    </Router>
  }
}

export const Root = compose(
  WithRedux([], [RActions.AddPathName]),
  withStyles(styles)
)(RootPlain)

export default Root
