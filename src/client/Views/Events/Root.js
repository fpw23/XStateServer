import React from 'react'
import { compose } from '@proista/client-tools/lib/index'
import { UnknownRoute, IndexRoute } from '@proista/client/lib/Controls/Core/index'
import { ah as RActions } from '@proista/client/lib/Data/Router/Types'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { Router } from '@reach/router'
import { withStyles } from '@material-ui/core'
import { AddNew } from './AddNew'
import { Root as Details } from './Details/Root'
import { List } from './List'
import { Details as TaskDetails } from 'common-views/Tasks/Details'

const styles = (theme) => ({
  root: {
    width: '100%'
  }
})

export class RootPlain extends React.Component {
  componentDidMount () {
    const { RouterAddPathName } = this.props
    RouterAddPathName('AddNew', 'Add New')
  }

  render () {
    const { navigate, classes } = this.props
    const rootProps = {
      navigate,
      rootClasses: classes
    }

    return <Router>
      <IndexRoute path='/' to='./Find' />
      <List path='Find' {...rootProps} />
      <AddNew path='AddNew' {...rootProps} />
      <Details path=':EventId/Details' {...rootProps} />
      <TaskDetails path=':EventId/Details/:TaskId/Details' {...rootProps} BackURL='../..' />
      <UnknownRoute default />
    </Router>
  }
}

export const Root = compose(
  WithRedux([], [RActions.AddPathName]),
  withStyles(styles)
)(RootPlain)

export default Root
