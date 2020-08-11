import React from 'react'
import { SideBarList, SideBarLink, SideBarBackLink } from '@proista/client-ui-material/lib/Controls/Layouts/Lovey/index'
// import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'

export class SideBar extends React.Component {
  render () {
    const { relativePath } = this.props
    return <SideBarList>
      <SideBarBackLink noIcon relativePath={relativePath} />
      {/* <ListSubheader>Events</ListSubheader> */}
      <Divider />
      <SideBarLink title='Find' to='Events/Find' relativePath={relativePath} />
      <SideBarLink title='Add New' to='Events/AddNew' relativePath={relativePath} />
    </SideBarList>
  }
}
