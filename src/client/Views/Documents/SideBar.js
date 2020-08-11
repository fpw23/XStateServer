import React from 'react'
import { SideBarList, SideBarLink, SideBarBackLink } from '@proista/client-ui-material/lib/Controls/Layouts/Lovey/index'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'

export class SideBar extends React.Component {
  render () {
    const { relativePath } = this.props
    return <SideBarList>
      <ListSubheader>Documents</ListSubheader>
      <Divider />
      <SideBarLink title='Find' to='Documents/Find' relativePath={relativePath} />
      <SideBarBackLink noIcon relativePath={relativePath} />
    </SideBarList>
  }
}
