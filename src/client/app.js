import React from 'react'
import { Layout, SideBarList, SideBarLink } from '@proista/client-ui-material/lib/Controls/Layouts/Lovey/index'
import { UnknownRoute } from '@proista/client/lib/Controls/Core/index'
import { CatchError } from '@proista/client/lib/Controls/Core/CatchError'
import { ah as RActions } from '@proista/client/lib/Data/Router/Types'
import { compose } from '@proista/client-tools/lib/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { withStyles } from '@material-ui/core'
import { Router } from '@reach/router'
import * as Events from 'common-views/Events/index'
import * as Documents from 'common-views/Documents/index'
import * as Tasks from 'common-views/Tasks/index'
import { Welcome } from 'common-views/Welcome'

const styles = (theme) => {
  return {
    root: {
      padding: '20px'
    }
  }
}

class AppSideBar extends React.Component {
  render () {
    const { relativePath } = this.props
    return <SideBarList>
      <SideBarLink title='Events' to='/Events' relativePath={relativePath} />
      <SideBarLink title='Tasks' to='/Tasks' relativePath={relativePath} />
      <SideBarLink title='Documents' to='/Documents' relativePath={relativePath} />
    </SideBarList>
  }
}

export class AppPlain extends React.Component {
  componentDidMount () {
    const { RouterAddPathName } = this.props
    RouterAddPathName('MyTasks', 'My Tasks')
  }

  renderSideBar = () => {
    const { uri } = this.props
    return (
      <Router>
        <AppSideBar default relativePath={uri} />
        <Events.SideBar path='Events/*' relativePath={uri} />
        <Documents.SideBar path='Documents/*' relativePath={uri} />
        <Tasks.SideBar path='Tasks/*' relativePath={uri} />
      </Router>
    )
  }

  render () {
    const { classes } = this.props

    return (
      <Layout sideBar={this.renderSideBar}>
        <div className={classes.root}>
          <CatchError>
            <Router>
              {/* Default */}
              <Welcome path='/' />
              {/* Events */}
              <Events.Root path='Events/*' />
              {/* Documents */}
              <Documents.Root path='Documents/*' />
              {/* Tasks */}
              <Tasks.Root path='Tasks/*' />
              <UnknownRoute default />
            </Router>
          </CatchError>
        </div>
      </Layout>
    )
  }
}

export const App = compose(
  WithRedux([], [RActions.AddPathName]),
  withStyles(styles)
)(AppPlain)
